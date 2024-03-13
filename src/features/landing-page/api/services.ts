import { axiosApiInstance } from '../../../configs/axios'
import { API_ROUTES } from '../../../routes'
import { buildQueryParamsString } from '../../../utils'

import {
  GetPostsProps,
  GetRepliesProps,
  PostsResponseDto,
  postsResponseDtoSchema,
  RepliesResponseDto,
  repliesResponseDtoSchema,
} from './types'

export const getPosts = async ({ queryParameters }: GetPostsProps) => {
  const queryParams = buildQueryParamsString(queryParameters)
  const response = await axiosApiInstance.get<PostsResponseDto>(
    `${API_ROUTES.posts}${queryParams ? `?${queryParams}` : ''}`
  )

  postsResponseDtoSchema.parse(response.data)

  return response
}

export const getReplies = async ({ postId, queryParameters }: GetRepliesProps) => {
  const queryParams = buildQueryParamsString(queryParameters)
  const response = await axiosApiInstance.get<RepliesResponseDto>(
    `${API_ROUTES.replies(postId)}${queryParams ? `?${queryParams}` : ''}`
  )

  repliesResponseDtoSchema.parse(response.data)

  return response
}
