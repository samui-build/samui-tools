import { PublicKeyString } from '@/features/account/data-access'
import { useGetTokenAccounts } from '@/features/account/data-access/use-get-token-accounts.ts'
import { AccountUiTokenBalance } from '@/features/account/ui/account-ui-token-balance.tsx'
import { ExplorerLink } from '@/features/cluster/ui'
import { ellipsify, UiCard } from '@/ui'
import { ActionIcon, Alert, Button, Stack, Table } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { LucideRefreshCw } from 'lucide-react'
import { useMemo, useState } from 'react'

export function AccountFeatureDetailTokens({ address }: { address: PublicKeyString }) {
  const [showAll, setShowAll] = useState(false)
  const query = useGetTokenAccounts({ address })
  const client = useQueryClient()
  const items = useMemo(() => {
    if (showAll) {
      return query.data
    }
    return query.data?.slice(0, 5)
  }, [query.data, showAll])

  return (
    <UiCard
      title="Token Accounts"
      isLoading={query.isLoading}
      action={
        <ActionIcon
          variant="outline"
          onClick={async () => {
            await query.refetch()
            await client.invalidateQueries({
              queryKey: ['getTokenAccountBalance'],
            })
          }}
        >
          <LucideRefreshCw size={16} />
        </ActionIcon>
      }
    >
      <Stack>
        {query.isError && (
          <Alert color="red" title="An error occurred">
            Error: ${query.error?.message.toString()}
          </Alert>
        )}

        {query.isSuccess && (
          <div>
            {query.data.length === 0 ? (
              <Alert color="blue" title="No token accounts found">
                Token accounts will appear here when you send or receive tokens.
              </Alert>
            ) : (
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Public Key</Table.Th>
                    <Table.Th>Mint</Table.Th>
                    <Table.Th ta="right">Balance</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {items?.map(({ account, pubkey }) => {
                    const pubkeyString = pubkey.toString()
                    return (
                      <Table.Tr key={pubkeyString}>
                        <Table.Td>
                          <ExplorerLink
                            ff="monospace"
                            label={ellipsify(pubkeyString)}
                            path={`account/${pubkeyString}`}
                          />
                        </Table.Td>
                        <Table.Td>
                          <ExplorerLink
                            ff="monospace"
                            label={ellipsify(account.data.parsed.info.mint)}
                            path={`account/${account.data.parsed.info.mint.toString()}`}
                          />
                        </Table.Td>
                        <Table.Td align="right">
                          <AccountUiTokenBalance ff="monospace" address={pubkeyString} />
                        </Table.Td>
                      </Table.Tr>
                    )
                  })}

                  {(query.data?.length ?? 0) > 5 && (
                    <Table.Tr>
                      <Table.Td colSpan={4} align="center">
                        <Button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Less' : 'Show All'}</Button>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            )}
          </div>
        )}
      </Stack>
    </UiCard>
  )
}
