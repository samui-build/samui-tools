import { AppShell, Loader } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactNode, Suspense } from 'react'
import { ClusterUiChecker } from '../features/cluster/ui'
import { UiLayoutFooter } from './ui-layout-footer.tsx'
import { AppLayoutHeaderLink, UiLayoutHeader } from './ui-layout-header.tsx'
import { UiLayoutNavbarLinkGroup } from './ui-layout-navbar-links-group.tsx'
import { UiLayoutNavbar } from './ui-layout-navbar.tsx'

export interface AppLayoutLink {
  label: string
  to: string
}

export function UiLayout({
  children,
  headerLinks = [],
  navbarLinkGroups = [],
}: {
  children: ReactNode
  headerLinks?: AppLayoutHeaderLink[]
  navbarLinkGroups?: UiLayoutNavbarLinkGroup[]
}) {
  const [opened, { toggle, close }] = useDisclosure()
  const hasNavbar = navbarLinkGroups.length > 0

  return (
    <AppShell
      header={{ height: 50 }}
      footer={{ height: 50 }}
      navbar={
        hasNavbar
          ? {
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }
          : undefined
      }
      padding="md"
    >
      <AppShell.Header>
        <UiLayoutHeader hasNavbar={hasNavbar} links={headerLinks} opened={opened} toggle={toggle} />
      </AppShell.Header>
      {hasNavbar ? (
        <AppShell.Navbar>
          <UiLayoutNavbar groups={navbarLinkGroups} close={close} />
        </AppShell.Navbar>
      ) : null}
      <AppShell.Main>
        <Suspense fallback={<Loader />}>
          <ClusterUiChecker>
            <div />
          </ClusterUiChecker>
          {children}
        </Suspense>
      </AppShell.Main>
      <AppShell.Footer>
        <UiLayoutFooter />
      </AppShell.Footer>
    </AppShell>
  )
}
