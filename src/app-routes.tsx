import {
  LazyAccountDetailFeature,
  LazyAccountListFeature,
  LazyClusterFeature,
  LazyDevFeature,
  LazyHeliusFeature,
  LazyHomeFeature,
  LazyKeypairFeature,
  LazyLabelFeature,
  LazyTodoFeature,
  LazyTokenFeature,
} from '@/features'
import { IconHelius, UiLayout } from '@/ui'
import {
  LucideBug,
  LucideCoins,
  LucideHome,
  LucideKey,
  LucideListChecks,
  LucideNetwork,
  LucideTags,
  LucideWallet,
} from 'lucide-react'
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
          { label: 'Keypairs', icon: LucideKey, to: '/keypairs' },
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
          { label: 'Clusters', icon: LucideNetwork, to: '/clusters' },
          { label: 'Labels', icon: LucideTags, to: '/labels' },
          { label: 'Todo', icon: LucideListChecks, to: '/todo' },
          { label: 'Dev', icon: LucideBug, to: '/dev' },
        ]}
      >
        <Outlet />
      </UiLayout>
    ),
    children: [
      { index: true, element: <Navigate to="./home" replace /> },
      { path: '/account', element: <LazyAccountListFeature /> },
      { path: '/account/:address', element: <LazyAccountDetailFeature /> },
      { path: '/clusters', element: <LazyClusterFeature /> },
      { path: '/dev/*', element: <LazyDevFeature /> },
      { path: '/helius/*', element: <LazyHeliusFeature /> },
      { path: '/home', element: <LazyHomeFeature /> },
      { path: '/keypairs/*', element: <LazyKeypairFeature /> },
      { path: '/labels/*', element: <LazyLabelFeature /> },
      { path: '/todo/*', element: <LazyTodoFeature /> },
      { path: '/tokens/*', element: <LazyTokenFeature /> },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
