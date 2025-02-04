import { useQuery } from '@tanstack/react-query'
import { useHelius } from './helius-provider.tsx'

export function useHeliusGetCurrentTpsQuery() {
  const { helius, cluster } = useHelius()

  return useQuery({
    queryKey: ['helius', 'getCurrentTps', { cluster }],
    queryFn: async () => helius.rpc.getCurrentTPS(),
  })
}