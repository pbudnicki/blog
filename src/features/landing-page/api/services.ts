import { z } from 'zod'

import { axiosApiInstance } from '../../../configs/axios'
import { API_ROUTES } from '../../../routes'

// TODO: move to utils and add unit tests
function buildQueryParamsString<T extends Record<string, string | number | boolean>>(queryParameters: T): string {
  const queryParams = new URLSearchParams()

  Object.entries(queryParameters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString())
    }
  })

  return queryParams.toString()
}

const postDtoSchema = z.object({
  title: z.string(),
  ID: z.number(),
  featured_image: z.string(),
  discussion: z.object({
    comment_count: z.number(),
  }),
})

const postsResponseDtoSchema = z.object({
  posts: z.array(postDtoSchema),
})

export type PostDto = z.infer<typeof postDtoSchema>

type PostsResponseDto = z.infer<typeof postsResponseDtoSchema>

export type PostsQueryParameters = {
  number?: number
}

type GetPostsProps = {
  queryParameters: PostsQueryParameters
}

export const getPosts = async ({ queryParameters }: GetPostsProps) => {
  const queryParams = buildQueryParamsString(queryParameters)
  const response = await axiosApiInstance.get<PostsResponseDto>(
    `${API_ROUTES.posts}${queryParams ? `?${queryParams}` : ''}`
  )

  postsResponseDtoSchema.parse(response.data)

  return response
}

const replyDtoSchema = z.object({
  content: z.string(),
  ID: z.number(),
})

export type ReplyDto = z.infer<typeof replyDtoSchema>

const repliesResponseDtoSchema = z.object({
  comments: z.array(replyDtoSchema),
  found: z.number(),
})

export type RepliesResponseDto = z.infer<typeof repliesResponseDtoSchema>

export type RepliesQueryParameters = {
  number?: number
  offset?: number
}

type GetRepliesProps = {
  postId: number
  queryParameters: RepliesQueryParameters
}

export const getReplies = async ({ postId, queryParameters }: GetRepliesProps) => {
  const queryParams = buildQueryParamsString(queryParameters)
  const response = await axiosApiInstance.get<RepliesResponseDto>(
    `${API_ROUTES.replies(postId)}${queryParams ? `?${queryParams}` : ''}`
  )

  repliesResponseDtoSchema.parse(response.data)

  return response
}
