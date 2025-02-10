import { useFs } from '@/features/files/data-access'
import { Group } from '@mantine/core'
import { FilesFeatureActionsDirectory, FilesFeatureActionsFile } from './files-feature-actions-directory.tsx'

export function FilesFeaturePageActions() {
  const { path, pathEntry } = useFs()

  if (!pathEntry) {
    return null
  }

  return (
    <Group gap="xs">
      {pathEntry?.type === 'directory' ? (
        <FilesFeatureActionsDirectory path={path} />
      ) : (
        <FilesFeatureActionsFile path={path} />
      )}
    </Group>
  )
}
