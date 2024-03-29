import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { LandingPage } from './features'
import { query } from './configs'

const queryClient = new QueryClient(query)

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LandingPage />
    </QueryClientProvider>
  )
}
