import { z } from 'zod'

export const replyDtoSchema = z.object({
  content: z.string(),
  ID: z.number(),
})

export type ReplyDto = z.infer<typeof replyDtoSchema>

export const repliesResponseDtoSchema = z.object({
  comments: z.array(replyDtoSchema),
  found: z.number(),
})

export type RepliesResponseDto = z.infer<typeof repliesResponseDtoSchema>

export type RepliesQueryParameters = {
  number?: number
  offset?: number
}

export type GetRepliesProps = {
  postId: number
  queryParameters: RepliesQueryParameters
}
