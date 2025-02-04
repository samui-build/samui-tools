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
        navbarLinks={[
          { label: 'Home', to: '/home' },
          { label: 'Helius', to: '/helius' },
          { label: 'Account', to: '/account' },
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
