import { UiCard } from '@/ui'
import { Accordion, Alert, Stack } from '@mantine/core'
import { Webhook } from 'helius-sdk'
import { LucideWebhook } from 'lucide-react'
import { useHeliusGetAllWebhooks } from './data-access'

export function HeliusFeatureWebhooksList() {
  const query = useHeliusGetAllWebhooks()
  return (
    <Stack>
      <UiCard title="Webhook List" description="List of all webhooks" isLoading={query.isLoading} error={query.error}>
        {query.data?.length ? (
          <HeliusUiWebhookList webhooks={query.data} />
        ) : (
          <Alert color="blue" title="No webhooks found" />
        )}
      </UiCard>
    </Stack>
  )
}

export function HeliusUiWebhookList({ webhooks }: { webhooks: Webhook[] }) {
  return (
    <Accordion variant="contained">
      {webhooks.map((webhook) => (
        <Accordion.Item value={webhook.webhookID} key={webhook.webhookID}>
          <Accordion.Control icon={<LucideWebhook />}>{webhook.webhookID}</Accordion.Control>
          <Accordion.Panel>
            <pre>{JSON.stringify(webhook, null, 2)}</pre>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
