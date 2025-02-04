import { Stack, Title } from '@mantine/core'
import { HeliusFeatureOverviewCurrentTps } from './helius-feature-overview-current-tps.tsx'

export function HeliusFeatureOverview() {
  return (
    <Stack>
      <Title order={3}>Overview</Title>
      <HeliusFeatureOverviewCurrentTps />
    </Stack>
  )
}
