import { useConnection } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getPublicKey, PublicKeyString } from './public-key-string'

export function useGetSignatures({ address }: { address: PublicKeyString }) {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['getSignatures', { endpoint: connection?.rpcEndpoint, address }],
    queryFn: () => connection.getSignaturesForAddress(getPublicKey(address)),
  })
}
