import { FilesUiLinkWithIcon } from '@/features/files/ui/files-ui-link-with-icon.tsx'
import { FsFileEntry } from '@/features/files/utils'
import { toastError, toastSuccess, uiModalConfirmDelete, UiTime } from '@/ui'
import { ActionIcon, Group, Table, Text } from '@mantine/core'
import { LucidePencil, LucideTrash } from 'lucide-react'
import { useState } from 'react'

export function FilesUiTable({
  files,
  deleteFile,
  renameFile,
}: {
  files: FsFileEntry[]
  deleteFile: (input: { path: string }) => Promise<boolean>
  renameFile: (input: { path: string; newPath: string }) => Promise<boolean>
}) {
  const [deleting, setDeleting] = useState<string | null>(null)
  const [renaming, setRenaming] = useState<string | null>(null)

  return (
    <Table withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th w={80}>Size</Table.Th>
          <Table.Th w={80}>Type</Table.Th>
          <Table.Th w={100} ta="right">
            Created
          </Table.Th>
          <Table.Th w={100} ta="right">
            Modified
          </Table.Th>
          <Table.Th w={50} ta="center">
            Actions
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {files
          .sort((a) => (a.type === 'directory' ? -1 : 1))
          .map((file) => (
            <Table.Tr key={file.path}>
              <Table.Td>
                <FilesUiLinkWithIcon file={file} />
              </Table.Td>
              <Table.Td>{file.stat.size}</Table.Td>
              <Table.Td>{file.type}</Table.Td>
              <Table.Td ta="right">
                <UiTime date={file.stat.ctimeMs} style={{ whiteSpace: 'nowrap' }} />
              </Table.Td>
              <Table.Td ta="right">
                <UiTime date={file.stat.mtimeMs} style={{ whiteSpace: 'nowrap' }} />
              </Table.Td>
              <Table.Td ta="center">
                <Group wrap="nowrap" justify="center" gap="xs">
                  <ActionIcon
                    loading={renaming === file.path}
                    variant="light"
                    size="sm"
                    color="red"
                    onClick={async () => {
                      const newPath = window.prompt('New name', file.name)
                      if (!newPath) {
                        return
                      }
                      setRenaming(file.path)
                      await renameFile({ path: file.path, newPath: file.path.replace(file.name, newPath) })
                        .then((renamed) => {
                          if (renamed) {
                            toastSuccess(`Renamed ${file.type}: ${file.name}`)
                          } else {
                            toastError(`Failed to rename ${file.type}: ${file.name}`)
                          }
                        })
                        .catch((err) => toastError(`Err: ${err}`))
                        .finally(() => setRenaming(null))
                    }}
                  >
                    <LucidePencil size={16} />
                  </ActionIcon>
                  <ActionIcon
                    loading={deleting === file.path}
                    disabled={deleting !== null && deleting !== file.path}
                    variant="light"
                    size="sm"
                    color="red"
                    onClick={async () => {
                      uiModalConfirmDelete({
                        children: (
                          <Text size="sm">
                            This will permanently delete the {file.type}
                            <strong> {file.name} </strong> and cannot be undone.
                          </Text>
                        ),
                        onConfirm: async () => {
                          setDeleting(file.path)
                          await deleteFile({ path: file.path })
                            .then((deleted) => {
                              if (deleted) {
                                toastSuccess(`Deleted ${file.type}: ${file.name}`)
                              } else {
                                toastError(`Failed to delete ${file.type}: ${file.name}`)
                              }
                            })
                            .catch((err) => toastError(`Err: ${err}`))
                            .finally(() => setDeleting(null))
                        },
                      })
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
