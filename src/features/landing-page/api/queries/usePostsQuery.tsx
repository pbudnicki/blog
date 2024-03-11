import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '../../../../routes'
import { getPosts, PostsQueryParameters } from '../services'

// import { signIn } from './services'

// export const useSignInQuery = (phoneNumber: string, options?: UseQueryOptions<unknown, Error, unknown>) =>
//   useQuery<unknown, Error, unknown>({
//     ...options,
//     queryKey: ['signIn', 'otp'],
//     queryFn: async () => signIn(phoneNumber),
//   })

type UsePostsQueryProps = {
  queryParameters: PostsQueryParameters
}

export const usePostsQuery = ({ queryParameters }: UsePostsQueryProps) =>
  useQuery({
    queryFn: async () => await getPosts({ queryParameters }),
    queryKey: [QueryKeys.Posts],
  })
