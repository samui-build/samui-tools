import { useCluster } from '@/features/cluster/data-access'
import { useQueryClient } from '@tanstack/react-query'

export function useInvalidateFetchAssetWithCollection() {
  const { cluster } = useCluster()
  const queryClient = useQueryClient()

  return {
    invalidate: (mint: string) =>
      queryClient.invalidateQueries({ queryKey: ['fetch-asset-with-collection', cluster, mint] }),
  }
}
