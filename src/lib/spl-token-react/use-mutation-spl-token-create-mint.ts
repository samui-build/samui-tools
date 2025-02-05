import { splTokenCreateMint, SplTokenCreateMintInput } from '@/lib/spl-token'
import { Connection } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'

export function useMutationSplTokenCreateMint({ connection }: { connection: Connection }) {
  return useMutation({
    mutationFn: (input: Omit<SplTokenCreateMintInput, 'connection'>) => {
      try {
        return splTokenCreateMint({ ...input, connection })
      } catch (error) {
        console.log('error', error)
        throw `Error: ${error}`
      }
    },
  })
}
