import { useMutation } from '@tanstack/react-query'
import { CreateWebhookRequest } from 'helius-sdk'
import { useHelius } from './helius-provider.tsx'

export function useHeliusCreateWebhook() {
  const { helius, cluster } = useHelius()

  return useMutation({
    mutationKey: ['helius', 'createWebhook', { cluster }],
    mutationFn: async (request: CreateWebhookRequest) => {
      try {
        return await helius.createWebhook(request)
      } catch (error) {
        throw error instanceof Error ? error.message : JSON.stringify(error)
      }
    },
  })
}
