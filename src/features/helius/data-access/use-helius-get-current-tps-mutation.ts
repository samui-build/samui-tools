import { useMutation } from '@tanstack/react-query'
import { useHelius } from './helius-provider.tsx'

export function useHeliusGetCurrentTpsMutation() {
  const { helius } = useHelius()
  return useMutation({
    mutationFn: async () => helius.rpc.getCurrentTPS(),
  })
}
