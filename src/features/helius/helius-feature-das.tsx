import { Paper, Stack, Title } from '@mantine/core'

export function HeliusFeatureDas() {
  return (
    <Stack>
      <Title order={3}>Digital Asset Standard</Title>
      <HeliusUiDasSearchAsset />
      <HeliusUiDasSearchAsset />
    </Stack>
  )
}

export function HeliusUiDasSearchAsset() {
  return (
    <Paper p="md" withBorder shadow="sm">
      CARD
    </Paper>
  )
}
