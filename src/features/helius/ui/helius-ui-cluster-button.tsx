import { Button } from '@mantine/core'
import { HeliusCluster } from 'helius-sdk'
import { useHelius } from '../data-access/helius-provider.tsx'

export function HeliusUiClusterButton(props: { cluster: HeliusCluster }) {
  const { cluster, setCluster } = useHelius()
  return (
    <Button
      disabled={cluster === props.cluster}
      size="xs"
      onClick={() => setCluster(props.cluster)}
      variant={cluster === props.cluster ? 'filled' : 'light'}
    >
      {props.cluster === 'devnet' ? 'Devnet' : 'Mainnet'}
    </Button>
  )
}