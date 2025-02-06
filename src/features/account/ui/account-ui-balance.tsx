import { Text, TextProps } from '@mantine/core'
import { useGetBalance } from '../data-access'
import { AccountUiBalanceSol } from './account-ui-balance-sol'

export function AccountUiBalance({ address, ...props }: { address: string } & TextProps) {
  const query = useGetBalance({ address })

  return (
    <Text onClick={() => query.refetch()} {...props}>
      {query.data ? <AccountUiBalanceSol balance={query.data} /> : '...'} SOL
    </Text>
  )
}
