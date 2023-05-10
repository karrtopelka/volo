import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactChildren } from '@/types'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 1,
    },
  },
})

export const ReactQueryContext = ({ children }: ReactChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
