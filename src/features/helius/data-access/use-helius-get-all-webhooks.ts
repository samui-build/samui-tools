import { useQuery } from '@tanstack/react-query'
import { heliusGetAllWebhooks } from './helius-get-all-webhooks.ts'
import { useHelius } from './helius-provider.tsx'

export function useHeliusGetAllWebhooks() {
  const { helius, cluster } = useHelius()

  return useQuery({
    queryKey: ['helius', 'getAllWebhooks', { cluster }],
    queryFn: async () => heliusGetAllWebhooks(helius),
  })
}
