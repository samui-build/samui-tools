import { useConnection } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getPublicKey, PublicKeyString } from './public-key-string'

export function useGetTokenBalance({ address }: { address: PublicKeyString }) {
  const { connection } = useConnection()

  return useQuery({
    queryKey: ['getTokenBalance', { endpoint: connection?.rpcEndpoint, account: address }],
    queryFn: () => connection.getTokenAccountBalance(getPublicKey(address)),
  })
}
