import { Box, Flex } from '@mantine/core'
import { ReactNode } from 'react'
import { Outlet } from 'react-router'
import { UiPageHeader } from './ui-page-header.tsx'

export function UiPage({ action, icon, title }: { action?: ReactNode; icon?: ReactNode; title?: string }) {
  return (
    <Flex h="100%" direction="column" justify="space-between">
      <UiPageHeader action={action} icon={icon} title={title} />
      <Box style={{ flexGrow: 1, overflow: 'auto' }} p="md">
        <Outlet />
      </Box>
    </Flex>
  )
}
