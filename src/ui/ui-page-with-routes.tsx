import { RouteObject, useRoutes } from 'react-router'
import { UiPage, UiPageProps } from './ui-page.tsx'

export interface UiPageWithRoutesProps extends UiPageProps {
  routes: RouteObject[]
}

export function UiPageWithRoutes({ routes: children = [], ...props }: UiPageWithRoutesProps) {
  return useRoutes([{ path: '*', element: <UiPage {...props} />, children }])
}
