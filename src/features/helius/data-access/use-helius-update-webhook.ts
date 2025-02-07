import { useHelius } from '@/features/helius/data-access/helius-provider.tsx'
import { useHeliusGetAllWebhooks } from '@/features/helius/data-access/use-helius-get-all-webhooks.ts'
import { useMutation } from '@tanstack/react-query'
import { EditWebhookRequest } from 'helius-sdk'

export function useHeliusUpdateWebhook() {
  const { helius } = useHelius()
  const list = useHeliusGetAllWebhooks()

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: EditWebhookRequest }) => {
      try {
        const result = await helius.editWebhook(id, payload)
        await list.refetch()
        return result
      } catch (error) {
        throw error instanceof Error ? error.message : JSON.stringify(error)
      }
    },
  })
}