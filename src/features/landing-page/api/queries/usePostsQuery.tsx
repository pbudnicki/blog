import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '../../../../routes'
import { getPosts } from '../services'
import { PostsQueryParameters } from '../types'

type UsePostsQueryProps = {
  queryParameters: PostsQueryParameters
}

export const usePostsQuery = ({ queryParameters }: UsePostsQueryProps) =>
  useQuery({
    queryFn: async () => await getPosts({ queryParameters }),
    queryKey: [QueryKeys.Posts],
  })
