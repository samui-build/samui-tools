import { Flex, Group, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { ReactNode } from 'react'

export function UiPageHeader({ action, icon, title }: { action?: ReactNode; icon?: ReactNode; title?: string }) {
  const { colors } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const bg = colorScheme === 'dark' ? colors.dark[8] : colors.gray[0]

  return (
    <Flex justify="space-between" align="center" wrap="nowrap" bg={bg} px="md" py="xs">
      {icon || title ? (
        <Group justify="center" align="center" wrap="nowrap" gap="xs">
          {icon ? icon : null}
          <Text size="xl" span fw={700}>
            {title}
          </Text>
        </Group>
      ) : (
        <Group />
      )}
      {action ? (
        <Group justify="center" align="center" wrap="nowrap" gap="xs">
          {action}
        </Group>
      ) : null}
    </Flex>
  )
}