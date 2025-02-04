import { Box, Flex, Group, ScrollArea } from '@mantine/core'
import { ClusterUiSelect } from '../features/cluster/ui'
import { UiLayoutNavbarLinkGroup, UiLayoutNavbarLinksGroup } from './ui-layout-navbar-links-group'
import classes from './ui-layout-navbar.module.css'
import { UiThemeToggle } from './ui-theme-toggle.tsx'

export function UiLayoutNavbar({ groups, close }: { groups: UiLayoutNavbarLinkGroup[]; close: () => void }) {
  const items = groups.map((item) => <UiLayoutNavbarLinksGroup {...item} key={item.label} close={close} />)

  return (
    <Flex component="nav" h="100%" direction="column" px="md" py={0}>
      <ScrollArea className={classes.links}>
        <Box>{items}</Box>
      </ScrollArea>

      <Group p="xs" className={classes.footer} justify="space-between" align="center">
        <ClusterUiSelect />
        <UiThemeToggle display="flex" />
      </Group>
    </Flex>
  )
}
