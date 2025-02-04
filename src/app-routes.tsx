import { Group } from '@mantine/core'
import { lazy } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router'
import { ClusterUiSelect } from './features/cluster/ui'
import { HomeFeature } from './features/home/home.feature'
import { WalletButton } from './features/solana/solana-provider'
import { UiLayout } from './ui/ui-layout.tsx'
import { UiThemeToggle } from './ui/ui-theme-toggle.tsx'

const AccountList = lazy(() => import('./features/account/account-feature-list'))
const AccountDetail = lazy(() => import('./features/account/account-feature-detail'))
const ClusterFeature = lazy(() => import('./features/cluster/cluster-feature'))

const headerLinks = [
  { label: 'Home', to: '/home' },
  { label: 'Account', to: '/account' },
]

const router = createBrowserRouter([
  {
    element: (
      <UiLayout
        headerLinks={headerLinks}
        profile={
          <Group>
            <UiThemeToggle />
            <WalletButton />
            <ClusterUiSelect />
          </Group>
        }
      >
        <Outlet />
      </UiLayout>
    ),
    children: [
      { index: true, element: <Navigate to="./home" replace /> },
      { path: '/home', element: <HomeFeature /> },
      { path: '/account', element: <AccountList /> },
      { path: '/account/:address', element: <AccountDetail /> },
      { path: '/clusters', element: <ClusterFeature /> },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
