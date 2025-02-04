import { AppShell, Loader, NavLink } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactNode, Suspense } from 'react'
import { NavLink as Link } from 'react-router'
import { ClusterUiChecker } from '../features/cluster/ui'
import { UiLayoutFooter } from './ui-layout-footer.tsx'
import { AppLayoutHeaderLink, UiLayoutHeader } from './ui-layout-header.tsx'

export interface AppLayoutLink {
  label: string
  to: string
}

export function UiLayout({
  children,
  headerLinks = [],
  navbarLinks = [],
}: {
  children: ReactNode
  headerLinks?: AppLayoutHeaderLink[]
  navbarLinks?: AppLayoutLink[]
}) {
  const [opened, { toggle, close }] = useDisclosure()
  const hasNavbar = navbarLinks.length > 0

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
        <AppShell.Navbar p="md">
          {navbarLinks.map((link) => (
            <NavLink
              key={link.to}
              component={Link}
              to={link.to}
              label={link.label}
              onClick={() => {
                close()
              }}
            />
          ))}
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
