import { UiPageWithRoutes } from './ui-page-with-routes.tsx'
import { UiPageProps } from './ui-page.tsx'
import { UiTabRoute, UiTabRoutes } from './ui-tab-routes'

export interface UiPageWithTabsProps extends UiPageProps {
  basePath?: string
  tabs: UiTabRoute[]
}

export function UiPageWithTabs({ tabs, basePath, ...props }: UiPageWithTabsProps) {
  return (
    <UiPageWithRoutes
      routes={[
        {
          path: '*',
          element: <UiTabRoutes basePath={basePath} tabs={tabs} />,
        },
      ]}
      {...props}
    />
  )
}
