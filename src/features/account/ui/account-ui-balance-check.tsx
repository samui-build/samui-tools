import { useCluster } from '@/features/cluster/data-access'
import { ActionIcon, Alert, Group, Text } from '@mantine/core'
import { PublicKeyString, useGetBalance, useRequestAirdrop } from '../data-access'

export function AccountUiBalanceCheck({ address }: { address: PublicKeyString }) {
  const { cluster } = useCluster()
  const query = useGetBalance({ address })
  const requestAirdrop = useRequestAirdrop({ address })

  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return (
      <Alert
        variant="outline"
        color="yellow"
        styles={{
          label: { width: '100%' },
        }}
        title={
          <Group justify="center" gap="xs">
            <Text>
              You are connected to <strong>{cluster.name}</strong> but your account is not found on this cluster.
            </Text>
            <ActionIcon
              variant="light"
              color="yellow"
              size="sm"
              onClick={() => requestAirdrop.mutateAsync('1').catch((err) => console.log(err))}
            >
              Request Airdrop
            </ActionIcon>
          </Group>
        }
      ></Alert>
    )
  }
  return null
}
