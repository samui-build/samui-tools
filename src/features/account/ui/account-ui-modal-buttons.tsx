import { useCluster } from '@/features/cluster/data-access'
import { ButtonProps, Group } from '@mantine/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKeyString } from '../data-access'
import { AccountUiModalAirdrop } from './account-ui-modal-airdrop'
import { AccountUiModalReceive } from './account-ui-modal-receive'
import { AccountUiModalSend } from './account-ui-modal-send'

export function AccountUiModalButtons({ address, ...props }: { address: PublicKeyString } & ButtonProps) {
  const wallet = useWallet()
  const { cluster } = useCluster()

  return (
    <Group gap={4}>
      <AccountUiModalAirdrop disabled={cluster.network?.includes('mainnet')} address={address} {...props} />
      <AccountUiModalSend disabled={wallet.publicKey?.toString() !== address.toString()} address={address} {...props} />
      <AccountUiModalReceive address={address} {...props} />
    </Group>
  )
}
