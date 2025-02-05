import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from './app-routes'
import { theme } from './app-theme'
import { ClusterProvider } from './features/cluster/data-access'
import { SolanaProvider } from './features/solana'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <MantineProvider theme={theme}>
        <Notifications />
        <ClusterProvider>
          <SolanaProvider>
            <AppRoutes />
          </SolanaProvider>
        </ClusterProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
