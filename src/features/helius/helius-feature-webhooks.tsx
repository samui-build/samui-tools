import { Stack, Title } from '@mantine/core'
import { HeliusFeatureWebhooksCreate } from './helius-feature-webhooks-create.tsx'
import { HeliusFeatureWebhooksList } from './helius-feature-webhooks-list.tsx'

export function HeliusFeatureWebhooks() {
  return (
    <Stack>
      <Title order={3}>Webhooks</Title>
      <HeliusFeatureWebhooksList />
      <HeliusFeatureWebhooksCreate />
    </Stack>
  )
}
