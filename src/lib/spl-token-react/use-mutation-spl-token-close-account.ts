import { splTokenCloseAccount, SplTokenCloseAccountInput } from '@/lib/spl-token'
import { Connection } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'

export function useMutationSplTokenCloseAccount({ connection }: { connection: Connection }) {
  return useMutation({
    mutationFn: (input: Omit<SplTokenCloseAccountInput, 'connection'>) => {
      try {
        return splTokenCloseAccount({ ...input, connection })
      } catch (error) {
        console.log('error', error)
        throw `Error: ${error}`
      }
    },
  })
}
