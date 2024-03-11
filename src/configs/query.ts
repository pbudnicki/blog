import { QueryClientConfig } from '@tanstack/react-query'

export const query: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}
