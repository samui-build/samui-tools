import { UiPage } from '@/ui'
import { LucideNetwork } from 'lucide-react'
import { useRoutes } from 'react-router'
import { ClusterUiModal, ClusterUiTable } from './ui'

export default function ClusterFeature() {
  return useRoutes([
    {
      path: '',
      element: <UiPage title="Clusters" icon={<LucideNetwork size={24} />} action={<ClusterUiModal size="xs" />} />,
      children: [{ index: true, element: <ClusterUiTable /> }],
    },
  ])
}
