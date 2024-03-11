import React, { useState } from 'react'
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
    const comments = await getReplies({ postId, queryParameters: { number, offset } })
    return comments
  }

  const loadRepliesSequentially = async (postIds: number[]) => {
    for (const postId of postIds) {
      const comments = await getRepliesForPost({ postId, number: NUMBER_OF_REPLIES_TO_LOAD, offset: replyOffset })
      queryClient.setQueryData(
        [QueryKeys.Replies, postId],
        (data: AxiosResponse<RepliesResponseDto, unknown> | undefined) => {
          if (data) {
            comments.data.comments = data.data.comments.concat(comments.data.comments)
          }
          return comments
        }
      )
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
          <Post key={post.title} title={post.title} image={post.featured_image} id={post.ID} />
        ))}
      </Posts>
      <Button onClick={() => loadRepliesSequentially(posts.map(post => post.ID))}>
        {TRANSLATIONS.posts['load-comments']}
      </Button>
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
