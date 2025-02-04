import { ActionIcon, Flex, Group, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { LucideSettings } from 'lucide-react'
import { Link } from 'react-router'
import { IconHelius } from '../../../ui/icon/helius.tsx'
import { HeliusUiClusterButton } from './helius-ui-cluster-button.tsx'

export function HeliusUiLayoutHeader() {
  const { colors } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const bg = colorScheme === 'dark' ? colors.dark[8] : colors.gray[0]

  return (
    <Flex justify="space-between" align="center" wrap="nowrap" bg={bg} px="md" py="xs">
      <Group justify="center" align="center" wrap="nowrap" gap="xs">
        <IconHelius size={24} />
        <Text size="xl" span fw={700}>
          Helius
        </Text>
      </Group>
      <Group justify="center" align="center" wrap="nowrap" gap="xs">
        <HeliusUiClusterButton cluster="devnet" />
        <HeliusUiClusterButton cluster="mainnet-beta" />
        <ActionIcon component={Link} to="/helius/settings" variant="light" size="md">
          <LucideSettings size={18} />
        </ActionIcon>
      </Group>
    </Flex>
  )
}
