import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import styled from 'styled-components'

import { QueryKeys } from '../../routes'
import { spacing, TRANSLATIONS } from '../../constants'
import { Button } from '../../components'

import { Post } from './components'
import { PostDto, RepliesResponseDto } from './api/services'
import { getReplies, usePostsQuery } from './api'

const NUMBER_OF_REPLIES_TO_LOAD = 1

export const LandingPage = () => {
  const queryClient = useQueryClient()
  const postsQuery = usePostsQuery({ queryParameters: { number: 3 } })
  const [replyOffset, setReplyOffset] = useState<number>(0)

  const getRepliesForPost = async ({ postId, number, offset }: { postId: number; number: number; offset: number }) => {
    const replies = await getReplies({ postId, queryParameters: { number, offset } })
    return replies
  }

  const loadRepliesSequentiallyIfTheyExist = async (posts: PostDto[]) => {
    for (const post of posts) {
      if (post.discussion.comment_count >= replyOffset) {
        const replies = await getRepliesForPost({
          postId: post.ID,
          number: NUMBER_OF_REPLIES_TO_LOAD,
          offset: replyOffset,
        })
        queryClient.setQueryData(
          [QueryKeys.Replies, post.ID],
          (data: AxiosResponse<RepliesResponseDto, unknown> | undefined) => {
            if (data) {
              replies.data.comments = data.data.comments.concat(replies.data.comments)
            }
            return replies
          }
        )
      }
    }
    setReplyOffset(replyOffset => replyOffset + NUMBER_OF_REPLIES_TO_LOAD)
  }

  const renderPostsLoadingState = () => (
    <section>
      {/* TODO: skeleton screen */}
      {TRANSLATIONS.common.loading}...
    </section>
  )

  const renderPostsErrorMessage = () => (
    <section>
      <p>{TRANSLATIONS['error-messages']['something-went-wrong']}</p>
    </section>
  )

  const renderPostsSuccess = (posts: PostDto[]) => (
    <PostsWithLoadMoreButton>
      <Posts>
        {posts.map(post => (
          <Post
            key={post.title}
            title={post.title}
            image={post.featured_image}
            id={post.ID}
            replyOffset={replyOffset}
          />
        ))}
      </Posts>
      {/* TODO: add loader when replies are loading*/}
      {/* TODO: disable button when there is no more replies to fetch in every post*/}
      <Button onClick={() => loadRepliesSequentiallyIfTheyExist(posts)}>{TRANSLATIONS.posts['load-comments']}</Button>
    </PostsWithLoadMoreButton>
  )

  const renderPosts = () => {
    if (postsQuery.isLoading) {
      return renderPostsLoadingState()
    }
    if (postsQuery.data && postsQuery.data.data.posts.length > 0) {
      return renderPostsSuccess(postsQuery.data.data.posts)
    } else {
      return renderPostsErrorMessage()
    }
  }

  return (
    <Container>
      <header>
        <h1>{TRANSLATIONS.posts['welcome-to-my-recruitment-task']}.</h1>
      </header>
      {renderPosts()}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const PostsWithLoadMoreButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${spacing(2)};
`

const Posts = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing(2)};
  justify-content: center;
`
