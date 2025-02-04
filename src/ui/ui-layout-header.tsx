import { Burger, Button, Group, Image } from '@mantine/core'
import { ReactNode } from 'react'
import { NavLink as Link, useLocation } from 'react-router'

const appLogo = '/logo.svg'

export interface AppLayoutHeaderLink {
  label: string
  to: string
}

export function UiLayoutHeader({
  profile,
  hasNavbar,
  links = [],
  opened,
  toggle,
}: {
  profile: ReactNode
  hasNavbar: boolean
  links?: AppLayoutHeaderLink[]
  opened: boolean
  toggle: () => void
}) {
  const { pathname } = useLocation()

  return (
    <Group justify="space-between" align="center" h="100%" px="md">
      <Group justify="center" align="center" wrap="nowrap">
        {hasNavbar ? <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> : null}

        <Button
          size="lg"
          variant="subtle"
          leftSection={<Image src={appLogo} width={30} height={30} />}
          component={Link}
          to="/"
        >
          Samui Tools
        </Button>

        {links.length ? (
          <Group>
            {links.map((link) => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                variant={pathname.startsWith(link.to) ? 'filled' : 'light'}
              >
                {link.label}
              </Button>
            ))}
          </Group>
        ) : null}
      </Group>
      <Group justify="center" align="center">
        {profile}
      </Group>
    </Group>
  )
}
