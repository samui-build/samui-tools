import { ellipsify } from '@/ui'
import { ActionIcon, Anchor, Group, Table } from '@mantine/core'
import { LucideTrash } from 'lucide-react'
import { Link } from 'react-router'
import { TokenMint } from '../data-access/token-db.ts'

export function TokenUiMintTable({
  data,
  delete: deleteItem,
}: {
  data: TokenMint[]
  delete: (item: TokenMint) => Promise<void>
}) {
  return (
    <Table withTableBorder withRowBorders withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="45%">Address</Table.Th>
          <Table.Th w="45%">Program</Table.Th>
          <Table.Th w="5%">Decimals</Table.Th>
          <Table.Th w="45%">Secret</Table.Th>
          <Table.Th w="5%" ta="right">
            Actions
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>
              <Anchor component={Link} to={`./${item.address}`} ff="monospace" size="sm">
                {ellipsify(item.address, 8)}
              </Anchor>
            </Table.Td>
            <Table.Td>{ellipsify(item.programId, 8)}</Table.Td>
            <Table.Td>{item.decimals}</Table.Td>
            <Table.Td>{item.secretKey?.length ? `[REDACTED]` : 'N/A'}</Table.Td>
            <Table.Td>
              <Group wrap="nowrap" justify="center" gap="xs">
                <ActionIcon
                  variant="light"
                  color="red"
                  size="sm"
                  onClick={async () => {
                    if (!window.confirm('Are you sure?')) {
                      return
                    }
                    await deleteItem(item)
                  }}
                >
                  <LucideTrash size={16} />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
