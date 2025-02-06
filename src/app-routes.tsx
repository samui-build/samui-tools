import {
  LazyAccountFeature,
  LazyClusterFeature,
  LazyDevFeature,
  LazyHeliusFeature,
  LazyHomeFeature,
  LazyKeypairFeature,
  LazyLabelFeature,
  LazyMplCoreFeature,
  LazyTodoFeature,
  LazyTokenFeature,
} from '@/features'
import { IconHelius, UiLayout } from '@/ui'
import { LucideCoins, LucideHandMetal, LucideHome, LucideListChecks, LucideSettings, LucideWallet } from 'lucide-react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    element: (
      <UiLayout
        headerLinks={[
          {
            label: 'Home',
            to: '/home',
          },
          {
            label: 'Account',
            to: '/account',
          },
        ]}
        navbarLinkGroups={[
          { label: 'Home', icon: LucideHome, to: '/home' },
          { label: 'Account', icon: LucideWallet, to: '/account' },
          { label: 'Tokens', icon: LucideCoins, to: '/tokens' },
          {
            label: 'Helius',
            icon: IconHelius,
            links: [
              { to: '/helius/overview', label: 'Overview' },
              { to: '/helius/das', label: 'DAS' },
              { to: '/helius/webhooks', label: 'Webhooks' },
              { to: '/helius/settings', label: 'Settings' },
            ],
          },
          {
            label: 'Metaplex Core',
            icon: LucideHandMetal,
            links: [
              { to: '/mpl-core/explorer', label: 'Explorer' },
              { to: '/mpl-core/create', label: 'Create' },
            ],
          },
          {
            label: 'Settings',
            icon: LucideSettings,
            links: [
              { label: 'Clusters', to: '/clusters' },
              { label: 'Labels', to: '/labels' },
              { label: 'Keypairs', to: '/keypairs' },
              { label: 'Dev', to: '/dev' },
            ],
          },
          { label: 'Todo', icon: LucideListChecks, to: '/todo' },
        ]}
      >
        <Outlet />
      </UiLayout>
    ),
    children: [
      { index: true, element: <Navigate to="./home" replace /> },
      { path: '/account/*', element: <LazyAccountFeature /> },
      { path: '/clusters', element: <LazyClusterFeature /> },
      { path: '/dev/*', element: <LazyDevFeature /> },
      { path: '/helius/*', element: <LazyHeliusFeature /> },
      { path: '/home', element: <LazyHomeFeature /> },
      { path: '/keypairs/*', element: <LazyKeypairFeature /> },
      { path: '/labels/*', element: <LazyLabelFeature /> },
      { path: '/mpl-core/*', element: <LazyMplCoreFeature /> },
      { path: '/todo/*', element: <LazyTodoFeature /> },
      { path: '/tokens/*', element: <LazyTokenFeature /> },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
