import { FilesFeaturePageActions } from '@/features/files/feature/files-feature-page-actions.tsx'
import { UiPageWithRoutes } from '@/ui'
import { Text } from '@mantine/core'
import { LucideFiles } from 'lucide-react'
import { useFs } from '../data-access'
import { FilesUiBreadcrumbs } from '../ui/files-ui-breadcrumbs.tsx'
import { FilesFeatureBrowser } from './files-feature-browser.tsx'

export function FilesFeaturePage() {
  const { path } = useFs()

  return (
    <UiPageWithRoutes
      title={
        <Text size="xl" span fw={700}>
          <FilesUiBreadcrumbs label="Files" path={path} />
        </Text>
      }
      action={<FilesFeaturePageActions />}
      icon={<LucideFiles size={24} />}
      routes={[{ index: true, element: <FilesFeatureBrowser /> }]}
    />
  )
}
