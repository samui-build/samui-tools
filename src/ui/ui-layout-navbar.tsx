import { Box, Flex, ScrollArea } from '@mantine/core'
import { UiLayoutNavbarLinkGroup, UiLayoutNavbarLinksGroup } from './ui-layout-navbar-links-group'
import classes from './ui-layout-navbar.module.css'

export function UiLayoutNavbar({ groups, close }: { groups: UiLayoutNavbarLinkGroup[]; close: () => void }) {
  const items = groups.map((item) => <UiLayoutNavbarLinksGroup {...item} key={item.label} close={close} />)

  return (
    <Flex component="nav" h="100%" direction="column" px="md" py={0}>
      {/*<div className={classes.header}>*/}
      {/*  <Group justify="space-between">*/}
      {/*    LOGO*/}
      {/*    <Code fw={700}>v3.1.2</Code>*/}
      {/*  </Group>*/}
      {/*</div>*/}

      <ScrollArea className={classes.links}>
        <Box>{items}</Box>
      </ScrollArea>

      <div className={classes.footer}>FOOTER</div>
    </Flex>
  )
}
