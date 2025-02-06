import { AccountUiAddress } from '@/features/account/ui/account-ui-address.tsx'
import { ExplorerLink } from '@/features/cluster/ui'
import { UiInfoItem, UiInfoTable } from '@/ui'
import { Text } from '@mantine/core'
import { AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { AccountUiBalance } from './account-ui-balance'

export function AccountUiOverview({
  address,
  account,
}: {
  address: string
  account: (AccountInfo<ParsedAccountData> & { space?: number }) | null
}) {
  const basics: UiInfoItem[] = [
    // We always want to show the address
    ['Address', <AccountUiAddress address={address} />],
  ]

  if (!account) {
    return <UiInfoTable items={[...basics, ['Balance', <Text>Account does not exist</Text>]]} />
  }

  return (
    <UiInfoTable
      items={[
        ...basics,
        ['Balance', <AccountUiBalance address={address} />],
        ['Data Size', <Text>{typeof account.space !== 'undefined' ? `${account.space} byte(s)` : null}</Text>],
        [
          'Program Id',
          account?.owner ? <ExplorerLink path={`account/${account?.owner}`} label={account?.owner.toString()} /> : null,
        ],
        ['Executable', account?.executable ? <Text>Yes</Text> : <Text>No</Text>],
      ]}
    />
  )
}
