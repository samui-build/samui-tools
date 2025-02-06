import { useCluster } from '@/features/cluster/data-access'
import { useConnection } from '@solana/wallet-adapter-react'
import { TransactionSignature } from '@solana/web3.js'
import { useQueryClient } from '@tanstack/react-query'
import { uiToastLink } from '../ui/ui-toast-link.tsx'
import { PublicKeyString } from './public-key-string'

export function useOnTransactionSuccess({ address }: { address: PublicKeyString }) {
  const { getExplorerUrl } = useCluster()
  const { connection } = useConnection()
  const client = useQueryClient()

  return (signature?: TransactionSignature) => {
    if (signature) {
      uiToastLink({ link: getExplorerUrl(`tx/${signature}`), label: 'View Transaction' })
    }
    return Promise.all([
      client.invalidateQueries({ queryKey: ['getBalance', { endpoint: connection?.rpcEndpoint, address }] }),
      client.invalidateQueries({ queryKey: ['getSignatures', { endpoint: connection?.rpcEndpoint, address }] }),
    ])
  }
}
