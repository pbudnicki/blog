import { z } from 'zod'

export const postDtoSchema = z.object({
  title: z.string(),
  ID: z.number(),
  featured_image: z.string(),
  discussion: z.object({
    comment_count: z.number(),
  }),
})

export const postsResponseDtoSchema = z.object({
  posts: z.array(postDtoSchema),
})

export type PostDto = z.infer<typeof postDtoSchema>

export type PostsResponseDto = z.infer<typeof postsResponseDtoSchema>

export type PostsQueryParameters = {
  number?: number
}

export type GetPostsProps = {
  queryParameters: PostsQueryParameters
}
