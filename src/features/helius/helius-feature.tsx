import { Navigate, useRoutes } from 'react-router'
import { UiPage } from '../../ui'
import { IconHelius } from '../../ui/icon/helius.tsx'
import { HeliusProvider } from './data-access'
import { HeliusFeatureDas } from './helius-feature-das.tsx'
import { HeliusFeatureOverview } from './helius-feature-overview.tsx'
import { HeliusFeatureSettings } from './helius-feature-settings.tsx'
import { HeliusFeatureWebhooks } from './helius-feature-webhooks.tsx'

export default function HeliusFeature() {
  const routes = useRoutes([
    {
      path: '',
      element: <UiPage title="Helius" icon={<IconHelius size={24} />} />,
      children: [
        { index: true, element: <Navigate to="./overview" replace /> },
        { path: '/overview', element: <HeliusFeatureOverview /> },
        { path: '/das', element: <HeliusFeatureDas /> },
        { path: '/settings', element: <HeliusFeatureSettings /> },
        { path: '/webhooks', element: <HeliusFeatureWebhooks /> },
      ],
    },
  ])

  return <HeliusProvider>{routes}</HeliusProvider>
}
