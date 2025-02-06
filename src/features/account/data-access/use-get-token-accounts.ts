import { useConnection } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getAllTokenAccounts } from './get-all-token-accounts.ts'
import { getPublicKey, PublicKeyString } from './public-key-string'

export function useGetTokenAccounts({ address }: { address: PublicKeyString }) {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['getTokenAccounts', { endpoint: connection?.rpcEndpoint, address }],
    queryFn: () => getAllTokenAccounts(connection, getPublicKey(address)),
  })
}
