import { Loader, Text, TextProps } from '@mantine/core'
import { useGetTokenBalance } from '../data-access'

export function AccountUiTokenBalance({ address, ...props }: { address: string } & TextProps) {
  const query = useGetTokenBalance({ address })

  return query.isLoading ? (
    <Loader />
  ) : query.data ? (
    <Text {...props}>{query.data?.value.uiAmount}</Text>
  ) : (
    <div>Error</div>
  )
}
