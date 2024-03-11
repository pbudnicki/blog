import React from 'react'
import styled from 'styled-components'

import { useRepliesQuery } from '../api'
import { spacing, TRANSLATIONS } from '../../../constants'

import { Reply } from './Reply'

type PostProps = {
  title: string
  id: number
  image: string
}

export const Post = ({ id, image, title }: PostProps) => {
  const repliesQuery = useRepliesQuery({ queryParameters: { number: 1 }, shouldFetchData: false, postId: id })
  const renderReplies = () => {
    if (repliesQuery.isFetching) {
      return <p>{TRANSLATIONS.common.loading}...</p>
    }
    if (repliesQuery.isError) {
      return <p>{TRANSLATIONS['error-messages']['something-went-wrong']}</p>
    }
    if (repliesQuery.data && repliesQuery.data.data.comments.length > 0) {
      return repliesQuery.data.data.comments.map(reply => <Reply key={reply.ID} content={reply.content} />)
    }
  }

  return (
    <Container>
      <Title title={title}>{title}</Title>
      <Image src={image} alt={title} loading='lazy' />
      <div>{renderReplies()}</div>
    </Container>
  )
}

const Container = styled.article`
  box-shadow: 0px 2px 4px rgba(164, 164, 164, 0.25);
  background-color: #fafafa;
  border-radius: ${spacing(1)};
  width: ${spacing(80)};
  padding: ${spacing(2)};
`

const Title = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Image = styled.img`
  width: ${spacing(76)};
  height: ${spacing(30)};
`
