import { useMutation } from '@tanstack/react-query'
import { CreateWebhookRequest } from 'helius-sdk'
import { useHelius } from './helius-provider.tsx'
import { useHeliusGetAllWebhooks } from './use-helius-get-all-webhooks.ts'

export function useHeliusCreateWebhook() {
  const { helius } = useHelius()
  const list = useHeliusGetAllWebhooks()

  return useMutation({
    mutationFn: async (request: Omit<CreateWebhookRequest, 'accountAddressOwners' | 'txnStatus' | 'encoding'>) => {
      try {
        const result = await helius.createWebhook(request)
        await list.refetch()
        return result
      } catch (error) {
        throw error instanceof Error ? error.message : JSON.stringify(error)
      }
    },
  })
}
