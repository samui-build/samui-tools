import { Box, Flex } from '@mantine/core'
import { Outlet } from 'react-router'
import { HeliusUiLayoutHeader } from './helius-ui-layout-header.tsx'

export function HeliusUiLayout() {
  return (
    <Flex h="100%" direction="column" justify="space-between">
      <HeliusUiLayoutHeader />
      <Box style={{ flexGrow: 1, overflow: 'auto' }} p="md">
        <Outlet />
      </Box>
    </Flex>
  )
}
