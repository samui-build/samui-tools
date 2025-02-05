import { ActionIcon, Anchor, Group, Table } from '@mantine/core'
import { LucidePencil, LucideTrash } from 'lucide-react'
import { Link } from 'react-router'
import { LabelItem } from '../data-access'

export function LabelUiTableItems({
  data,
  delete: deleteItem,
  update: updateItem,
}: {
  data: LabelItem[]
  delete: (item: LabelItem) => Promise<void>
  update: (item: LabelItem) => Promise<void>
}) {
  return (
    <Table withTableBorder withRowBorders withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="45%">Label</Table.Th>
          <Table.Th w="45%">Address</Table.Th>
          <Table.Th w="5%" ta="right">
            Actions
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>{item.label}</Table.Td>
            <Table.Td>
              <Anchor component={Link} to={`/account/${item.address}`} ff="monospace" size="sm">
                {item.address}
              </Anchor>
            </Table.Td>
            <Table.Td>
              <Group wrap="nowrap" justify="center" gap="xs">
                <ActionIcon
                  variant="light"
                  size="sm"
                  onClick={async () => {
                    const updatedLabel = window.prompt('Enter label', item.label)
                    if (!updatedLabel?.trim()?.length) {
                      return
                    }
                    const updatedAddress = window.prompt('Enter address', item.address)
                    if (!updatedAddress?.trim()?.length) {
                      return
                    }
                    await updateItem({ ...item, label: updatedLabel, address: updatedAddress })
                  }}
                >
                  <LucidePencil size={16} />
                </ActionIcon>
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
