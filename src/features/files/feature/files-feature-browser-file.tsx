import { UiError } from '@/ui/ui-error.tsx'
import { Box, Stack } from '@mantine/core'
import { useFs, useFsFileGet } from '../data-access'

export function FilesFeatureBrowserFile() {
  const { fs, path } = useFs()
  const queryGetFile = useFsFileGet(fs, path)
  // const mutationCreateDirectory = useFsDirectoryCreate(fs, path)
  // const mutationCreateFile = useFsFileCreate(fs, path)

  return (
    <Box h="100%" style={{ overflow: 'auto' }}>
      <UiError error={queryGetFile.error} />
      {queryGetFile.data ? (
        <Stack>
          <pre>{JSON.stringify({ data: queryGetFile.data, queryGetFile }, null, 2)}</pre>
          {/*<Button  onClick={() => queryGetFiles.mutateAsync()}>Get Files</Button>*/}
          {/*<pre>{JSON.stringify({ data: queryGetFiles.data, queryGetFiles }, null, 2)}</pre>*/}
        </Stack>
      ) : null}
    </Box>
  )
}
