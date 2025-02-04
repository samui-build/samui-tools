import { Navigate, useRoutes } from 'react-router'
import { HeliusProvider } from './data-access/helius-provider.tsx'
import { HeliusFeatureDas } from './helius-feature-das.tsx'
import { HeliusFeatureOverview } from './helius-feature-overview.tsx'
import { HeliusFeatureSettings } from './helius-feature-settings.tsx'
import { HeliusFeatureWebhooks } from './helius-feature-webhooks.tsx'
import { HeliusUiLayout } from './ui/helius-ui-layout.tsx'

export default function HeliusFeature() {
  const routes = useRoutes([
    {
      path: '',
      element: <HeliusUiLayout />,
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
