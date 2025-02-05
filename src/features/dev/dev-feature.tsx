import { DevFeatureOverview } from '@/features/dev/dev-feature-overview.tsx'
import { UiPageWithTabs } from '@/ui'
import { LucideBug } from 'lucide-react'
import { DevFeatureNew } from './dev-feature-new.tsx'

export default function DevFeature() {
  return (
    <UiPageWithTabs
      title="Dev"
      icon={<LucideBug size={24} />}
      basePath="/dev"
      tabs={[
        { label: 'Overview', path: 'overview', element: <DevFeatureOverview /> },
        { label: 'New', path: 'new', element: <DevFeatureNew /> },
      ]}
    />
  )
}
