import { LucideHome, LucideNetwork, LucideWallet } from 'lucide-react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router'
import {
  LazyAccountDetailFeature,
  LazyAccountListFeature,
  LazyClusterFeature,
  LazyHeliusFeature,
  LazyHomeFeature,
} from './features'
import { UiLayout } from './ui'

const router = createBrowserRouter([
  {
    element: (
      <UiLayout
        headerLinks={[
          { label: 'Home', to: '/home' },
          { label: 'Account', to: '/account' },
        ]}
        navbarLinkGroups={[
          { label: 'Home', icon: LucideHome, to: '/home' },
          { label: 'Account', icon: LucideWallet, to: '/account' },
          { label: 'Clusters', icon: LucideNetwork, to: '/clusters' },
        ]}
      >
        <Outlet />
      </UiLayout>
    ),
    children: [
      { index: true, element: <Navigate to="./home" replace /> },
      { path: '/helius', element: <LazyHeliusFeature /> },
      { path: '/home', element: <LazyHomeFeature /> },
      { path: '/account', element: <LazyAccountListFeature /> },
      { path: '/account/:address', element: <LazyAccountDetailFeature /> },
      { path: '/clusters', element: <LazyClusterFeature /> },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
