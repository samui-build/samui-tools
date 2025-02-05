import { Box, Flex } from '@mantine/core'
import { ReactNode } from 'react'
import { Outlet } from 'react-router'
import { UiPageHeader, UiPageHeaderProps } from './ui-page-header.tsx'

export interface UiPageProps extends UiPageHeaderProps {
  children?: ReactNode
}

export function UiPage({ action, children = <Outlet />, icon, title }: UiPageProps) {
  return (
    <Flex h="100%" direction="column" justify="space-between">
      <UiPageHeader action={action} icon={icon} title={title} />
      <Box style={{ flexGrow: 1, overflow: 'auto' }} p="md">
        {children}
      </Box>
    </Flex>
  )
}
