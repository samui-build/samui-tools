import { SplTokenGetMintInput, splTokenGetMintWithMetadata } from '@/lib/spl-token'
import { useQuery } from '@tanstack/react-query'

export function useQuerySplTokenGetMint(input: SplTokenGetMintInput) {
  return useQuery({
    queryKey: ['SplTokenGetMint', { ...input, connection: input.connection?.rpcEndpoint }],
    queryFn: async () => {
      try {
        return splTokenGetMintWithMetadata(input)
      } catch (error) {
        console.log('error', error)
        throw `Error: ${error}`
      }
    },
    retry: 1,
  })
}
