import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { useCluster } from '../../cluster/data-access'
import { getAllTokenAccounts } from './get-all-token-accounts.ts'

export function useTokenAccounts() {
  const { publicKey } = useWallet()
  const { cluster } = useCluster()
  const { connection } = useConnection()

  return useQuery({
    queryKey: ['useTokenAccounts', { cluster, publicKey }],
    queryFn: () => (publicKey ? getAllTokenAccounts(connection, publicKey) : null),
  })
}

export function useBalance() {
  const { publicKey } = useWallet()
  const { cluster } = useCluster()
  const { connection } = useConnection()

  return useQuery({
    queryKey: ['useBalance', { cluster, publicKey }],
    queryFn: () => (publicKey ? connection.getBalance(publicKey) : null),
  })
}
