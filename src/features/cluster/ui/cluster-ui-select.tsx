import { ActionIcon, Button, Flex, Menu } from '@mantine/core'
import { LucideNetwork, LucideWifiHigh, LucideWifiOff } from 'lucide-react'
import { Link } from 'react-router'
import { useCluster } from '../data-access'

export function ClusterUiSelect() {
  const { clusters, setCluster, cluster } = useCluster()
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Flex>
          <Button variant="light" visibleFrom="sm" size="xs">
            {cluster.name}
          </Button>
          <ActionIcon variant="light" hiddenFrom="sm">
            <LucideNetwork size={20} />
          </ActionIcon>
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        {clusters.map((item) => (
          <Menu.Item
            key={item.name}
            onClick={() => setCluster(item)}
            leftSection={item.active ? <LucideWifiHigh /> : <LucideWifiOff />}
          >
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Item component={Link} to="/clusters">
          Manage Clusters
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
