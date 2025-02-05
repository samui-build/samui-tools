import { LucideBug } from 'lucide-react'
import { UiPageWithTabs } from '../../ui'
import { UiPageWithTabsProps } from '../../ui/ui-page-with-tabs.tsx'
import { DevFeatureNew } from './dev-feature-new.tsx'

export default function DevFeature() {
  const page: UiPageWithTabsProps = {
    title: 'Dev',
    icon: <LucideBug size={24} />,
    basePath: '/dev/',
    tabs: [
      {
        label: 'New',
        path: 'new',
        element: <DevFeatureNew />,
      },
    ],
  }

  return <UiPageWithTabs {...page} />
}
