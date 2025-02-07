import { Accordion } from '@mantine/core'
import { CreateWebhookRequest, Webhook } from 'helius-sdk'
import { LucideListPlus, LucideWebhook } from 'lucide-react'
import { ReactNode } from 'react'
import { HeliusUiWebhookFormCreate } from './helius-ui-webhook-form-create.tsx'

export function HeliusUiWebhookList({
  webhooks,
  create,
  createLoading,
  render,
}: {
  createLoading: boolean
  create: (input: CreateWebhookRequest) => Promise<Webhook>
  webhooks: Webhook[]
  render: (webhook: Webhook) => ReactNode
}) {
  return (
    <Accordion variant="separated" defaultValue={'create'}>
      <Accordion.Item value={'create'}>
        <Accordion.Control icon={<LucideListPlus />}>Create Webhook</Accordion.Control>
        <Accordion.Panel>
          <HeliusUiWebhookFormCreate
            isLoading={createLoading}
            submit={async (values) => {
              await create(values)
            }}
          />
        </Accordion.Panel>
      </Accordion.Item>
      {webhooks.map((webhook) => (
        <Accordion.Item value={webhook.webhookID} key={webhook.webhookID}>
          <Accordion.Control icon={<LucideWebhook />}>{webhook.webhookID}</Accordion.Control>
          <Accordion.Panel>{render(webhook)}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
