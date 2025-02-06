import { toastError } from '@/ui'
import { useConnection } from '@solana/wallet-adapter-react'
import { useMutation } from '@tanstack/react-query'
import { PublicKeyString } from './public-key-string'
import { requestAndConfirmAirdrop } from './request-and-confirm-airdrop.ts'
import { useOnTransactionSuccess } from './use-on-transaction-success.ts'

export function useRequestAirdrop({ address }: { address: PublicKeyString }) {
  const { connection } = useConnection()
  const onSuccess = useOnTransactionSuccess({ address })

  return useMutation({
    mutationKey: ['requestAirdrop', { endpoint: connection?.rpcEndpoint, address }],
    mutationFn: (amount: string) => requestAndConfirmAirdrop({ address, amount, connection }),
    onSuccess,
    onError: (error: unknown) => {
      toastError(`Requesting airdrop failed! ${error}`)
    },
  })
}
