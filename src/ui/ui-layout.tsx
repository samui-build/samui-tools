import { ClusterUiChecker } from '@/features/cluster/ui'
import { AppShell, Loader } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactNode, Suspense } from 'react'
import { AppLayoutHeaderLink, UiLayoutHeader } from './ui-layout-header.tsx'
import { UiLayoutNavbarLinkGroup } from './ui-layout-navbar-links-group.tsx'
import { UiLayoutNavbar } from './ui-layout-navbar.tsx'

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
      navbar={
        hasNavbar
          ? {
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }
          : undefined
      }
      padding={0}
      styles={{
        main: { height: '100%', overflow: 'hidden' },
        root: { height: '100%' },
      }}
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
            <></>
          </ClusterUiChecker>
          {children}
        </Suspense>
      </AppShell.Main>
    </AppShell>
  )
}
