import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '../../../../routes'
import { getReplies, RepliesQueryParameters } from '../services'

type UseRepliesQueryProps = {
  queryParameters: RepliesQueryParameters
  shouldFetchData: boolean
  postId?: number
}

export const useRepliesQuery = ({ queryParameters, shouldFetchData, postId }: UseRepliesQueryProps) =>
  useQuery({
    queryKey: [QueryKeys.Replies, postId],
    queryFn: async () => {
      if (postId !== undefined) {
        return await getReplies({ queryParameters, postId })
      } else {
        return undefined
      }
    },
    enabled: shouldFetchData && postId !== undefined,
  })
// póki co nie wiem jak to powinno działac
