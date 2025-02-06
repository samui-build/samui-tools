import { toastError } from '@/ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { TransactionSignature } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { createTransaction } from './create-transaction.ts'
import { getPublicKey, PublicKeyString } from './public-key-string'
import { useOnTransactionSuccess } from './use-on-transaction-success.ts'

export function useTransferSol({ address }: { address: PublicKeyString }) {
  const { connection } = useConnection()
  const wallet = useWallet()

  const onSuccess = useOnTransactionSuccess({ address: getPublicKey(address) })
  return useMutation({
    mutationKey: ['transferSol', { endpoint: connection?.rpcEndpoint, address }],
    mutationFn: async ({ amount, destination }: { amount: string; destination: PublicKeyString }) => {
      try {
        const { transaction, latestBlockhash } = await createTransaction({
          amount,
          connection,
          destination: getPublicKey(destination),
          publicKey: address,
        })

        // Send transaction and await for signature
        const signature: TransactionSignature = await wallet.sendTransaction(transaction, connection)

        // Send transaction and await for signature
        await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')

        return signature
      } catch (error: unknown) {
        console.log('error', `Transaction failed! ${error}`)
      }
    },

    onSuccess,
    onError: (error: unknown) => {
      toastError(`Sending transaction failed! ${error}`)
    },
  })
}
