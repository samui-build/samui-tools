import { splTokenCreateAccount, SplTokenCreateAccountInput } from '@/lib/spl-token'
import { Connection } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'

export function useMutationSplTokenCreateAccount({ connection }: { connection: Connection }) {
  return useMutation({
    mutationFn: (input: Omit<SplTokenCreateAccountInput, 'connection'>) => {
      try {
        return splTokenCreateAccount({ ...input, connection })
      } catch (error) {
        console.log('error', error)
        throw `Error: ${error}`
      }
    },
  })
}
