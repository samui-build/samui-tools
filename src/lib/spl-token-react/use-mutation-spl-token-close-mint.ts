import { splTokenCloseMint, SplTokenCloseMintInput } from '@/lib/spl-token'
import { Connection } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'

export function useMutationSplTokenCloseMint({ connection }: { connection: Connection }) {
  return useMutation({
    mutationFn: (input: Omit<SplTokenCloseMintInput, 'connection'>) => {
      try {
        return splTokenCloseMint({ ...input, connection })
      } catch (error) {
        console.log('error', error)
        throw `Error: ${error}`
      }
    },
  })
}
