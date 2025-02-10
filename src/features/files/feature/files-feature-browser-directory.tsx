import { useFsFileRename } from '@/features/files/data-access/use-fs-file-rename.tsx'
import { UiError } from '@/ui/ui-error.tsx'
import { Alert, Box, Loader } from '@mantine/core'
import { useFs, useFsFileDelete, useFsFilesGet } from '../data-access'
import { FilesUiTable } from '../ui'

export function FilesFeatureBrowserDirectory() {
  const { fs, path } = useFs()
  const queryGetFiles = useFsFilesGet(fs, path)
  const mutationDeleteFile = useFsFileDelete(fs)
  const mutationRenameFile = useFsFileRename(fs)
  const isLoading = queryGetFiles.isLoading
  const files = queryGetFiles.data ?? []

  return (
    <Box h="100%" style={{ overflow: 'auto' }}>
      <UiError error={queryGetFiles.error} />
      {isLoading ? (
        <Loader />
      ) : files.length ? (
        <FilesUiTable
          files={files}
          deleteFile={async (input) => {
            const deleted = await mutationDeleteFile.mutateAsync(input)
            await queryGetFiles.refetch()
            return deleted
          }}
          renameFile={async (input) => {
            const renamed = await mutationRenameFile.mutateAsync(input)
            await queryGetFiles.refetch()
            return renamed
          }}
        />
      ) : (
        <Alert color="blue" title="No files found" />
      )}
    </Box>
  )
}
