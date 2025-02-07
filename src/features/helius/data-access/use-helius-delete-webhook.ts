import { useHelius } from '@/features/helius/data-access/helius-provider.tsx'
import { useHeliusGetAllWebhooks } from '@/features/helius/data-access/use-helius-get-all-webhooks.ts'
import { useMutation } from '@tanstack/react-query'

export function useHeliusDeleteWebhook() {
  const { helius } = useHelius()
  const list = useHeliusGetAllWebhooks()

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      try {
        const result = await helius.deleteWebhook(id)
        await list.refetch()
        return result
      } catch (error) {
        throw error instanceof Error ? error.message : JSON.stringify(error)
      }
    },
  })
}