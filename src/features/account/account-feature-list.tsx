import { WalletButton } from '@/features/solana'
import { useWallet } from '@solana/wallet-adapter-react'
import { Navigate } from 'react-router'

export function AccountFeatureList() {
  const { publicKey } = useWallet()

  if (publicKey) {
    return <Navigate to={publicKey.toString()} replace />
  }

  return <WalletButton />
}
