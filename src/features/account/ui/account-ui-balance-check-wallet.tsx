import { useWallet } from '@solana/wallet-adapter-react'
import { AccountUiBalanceCheck } from './account-ui-balance-check'

export function AccountUiBalanceCheckWallet() {
  const { publicKey } = useWallet()
  if (!publicKey) {
    return null
  }
  return <AccountUiBalanceCheck address={publicKey} />
}
