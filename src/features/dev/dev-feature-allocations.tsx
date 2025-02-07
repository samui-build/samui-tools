import { Alert, Anchor, Box, Button, Stack, TextInput } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useGetSnapshots, useGetSnapshotsForWallet } from './use-get-snapshots.tsx'

export function DevFeatureAllocations() {
  const [endpoint, setEndpoint] = useState('https://collection-allocation.samui.build')
  const [address, setAddress] = useState('')

  const mutationSnapshots = useGetSnapshots(endpoint)
  const mutationWallet = useGetSnapshotsForWallet(endpoint)

  const snapshots: { id: string; description: string; name: string }[] = mutationSnapshots.data ?? []

  const assets: Record<string, number> = useMemo(() => {
    if (!mutationWallet.data) {
      return {}
    }
    return Object.fromEntries(
      Object.entries(mutationWallet.data.snapshots).map(([id, wallet]) => [id, wallet.allocation]),
    )
  }, [mutationWallet.data])

  return (
    <Box h="100%" style={{ overflow: 'auto' }}>
      <Stack>
        <Alert title="Collection Allocation" color="blue">
          Simple UI for the{' '}
          <Anchor
            href="https://github.com/samui-build/samui-collection-allocation"
            target="_blank"
            rel="noopener noreferrer"
            fz="inherit"
          >
            Samui Collection Allocation API
          </Anchor>
          .
        </Alert>
        <TextInput
          readOnly={mutationSnapshots.isPending}
          label="Endpoint"
          placeholder="https://collection-allocation.samui.build"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          rightSectionWidth={200}
          rightSection={
            <Button
              loading={mutationSnapshots.isPending}
              variant="light"
              fullWidth
              onClick={() => mutationSnapshots.mutateAsync()}
            >
              Get Snapshots
            </Button>
          }
        />
        <TextInput
          disabled={!mutationSnapshots.data}
          label="Address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rightSectionWidth={200}
          rightSection={
            <Button
              disabled={!mutationSnapshots.data}
              variant="light"
              fullWidth
              onClick={() => mutationWallet.mutateAsync(address)}
            >
              Get Wallet
            </Button>
          }
        />
        <Stack>
          {snapshots
            .sort((a, b) => a.id.localeCompare(b.id))
            .map((snapshot) => (
              <Alert
                color={mutationWallet.data ? (assets[snapshot.id] > 0 ? 'green' : 'red') : 'gray'}
                key={snapshot.id}
                title={snapshot.name}
              >
                {snapshot.description}
              </Alert>
            ))}
        </Stack>
      </Stack>
    </Box>
  )
}
