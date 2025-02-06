import { useConnection } from '@solana/wallet-adapter-react'
import { AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { getPublicKey, PublicKeyString } from './public-key-string'

export function useGetBalance({ address }: { address: PublicKeyString }) {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['getBalance', { endpoint: connection?.rpcEndpoint, address }],
    queryFn: () => connection.getBalance(getPublicKey(address)),
  })
}

export function useGetAccount({ address }: { address: PublicKeyString }) {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['getParsedAccountInfo', { endpoint: connection?.rpcEndpoint, address }],
    queryFn: () =>
      connection.getParsedAccountInfo(getPublicKey(address)).then((res) => ({
        ...res,
        value: res.value as AccountInfo<ParsedAccountData>,
      })),
  })
}
