import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '../../../../routes'
import { getPosts, PostsQueryParameters } from '../services'

type UsePostsQueryProps = {
  queryParameters: PostsQueryParameters
}

export const usePostsQuery = ({ queryParameters }: UsePostsQueryProps) =>
  useQuery({
    queryFn: async () => await getPosts({ queryParameters }),
    queryKey: [QueryKeys.Posts],
  })
