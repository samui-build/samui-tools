import { useGetSignatures } from '@/features/account/data-access'
import { ExplorerLink } from '@/features/cluster/ui'
import { ellipsify, UiCard, UiTime } from '@/ui'
import { ActionIcon, Alert, Badge, Button, Stack, Table } from '@mantine/core'
import { LucideRefreshCw } from 'lucide-react'
import { useMemo, useState } from 'react'

export function AccountFeatureDetailTransactions({ address }: { address: string }) {
  const query = useGetSignatures({ address })
  const [showAll, setShowAll] = useState(false)
  const itemCount = 25

  const items = useMemo(() => {
    if (showAll) {
      return query.data
    }
    return query.data?.slice(0, itemCount)
  }, [query.data, showAll])

  return (
    <UiCard
      title="Transaction History"
      isLoading={query.isLoading}
      action={
        <ActionIcon loading={query.isLoading} variant="outline" onClick={() => query.refetch()}>
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
        {query.isSuccess && query.data.length === 0 ? (
          <Alert color="blue" title="No transactions found.">
            Transactions will appear here when you send or receive tokens.
          </Alert>
        ) : (
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Signature</Table.Th>
                <Table.Th align="right">Slot</Table.Th>
                <Table.Th>Block Time</Table.Th>
                <Table.Th ta="right">Result</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items?.map((item) => (
                <Table.Tr key={item.signature}>
                  <Table.Th>
                    <ExplorerLink ff="monospace" path={`tx/${item.signature}`} label={ellipsify(item.signature, 8)} />
                  </Table.Th>
                  <Table.Td>
                    <ExplorerLink ff="monospace" path={`block/${item.slot}`} label={item.slot.toString()} />
                  </Table.Td>
                  <Table.Td>
                    <UiTime date={new Date((item.blockTime ?? 0) * 1000)} />
                  </Table.Td>
                  <Table.Td align="right">
                    {item.err ? (
                      <Badge color="red" title={JSON.stringify(item.err)}>
                        Failed
                      </Badge>
                    ) : (
                      <Badge color="green">Success</Badge>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
              {(query.data?.length ?? 0) > itemCount && (
                <Table.Tr>
                  <Table.Td colSpan={4} align="center">
                    <Button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Less' : 'Show All'}</Button>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        )}
      </Stack>
    </UiCard>
  )
}
