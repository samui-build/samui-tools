import { useCluster } from '@/features/cluster/data-access'
import { Alert, Button, Group, Text } from '@mantine/core'
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
        color="yellow"
        styles={{
          root: { display: 'flex', justifyContent: 'center' },
          title: { justifyContent: 'center' },
        }}
        title="Account not found"
      >
        <Group justify="center">
          <Text>
            You are connected to <strong>{cluster.name}</strong> but your account is not found on this cluster.
          </Text>
          <Button
            variant="light"
            color="yellow"
            size="xs"
            onClick={() => requestAirdrop.mutateAsync('1').catch((err) => console.log(err))}
          >
            Request Airdrop
          </Button>
        </Group>
      </Alert>
    )
  }
  return null
}
