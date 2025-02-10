import { UiError } from '@/ui/ui-error.tsx'
import { Alert, Box, Loader } from '@mantine/core'
import { useFs, useFsStat } from '../data-access'
import { FilesFeatureBrowserDirectory } from './files-feature-browser-directory.tsx'
import { FilesFeatureBrowserFile } from './files-feature-browser-file.tsx'

export function FilesFeatureBrowser() {
  const { fs, path } = useFs()
  const queryStat = useFsStat(fs, path)
  const stat = queryStat.data

  return queryStat.isLoading ? (
    <Loader />
  ) : (
    <Box h="100%" style={{ overflow: 'auto' }}>
      <UiError error={queryStat.error} />
      {stat ? (
        stat.isDirectory() ? (
          <FilesFeatureBrowserDirectory />
        ) : stat.isFile() ? (
          <FilesFeatureBrowserFile />
        ) : (
          <Alert title="Invalid path" color="red">
            Invalid path: <pre>{JSON.stringify(stat, null, 2)}</pre>
          </Alert>
        )
      ) : null}
    </Box>
  )
}
