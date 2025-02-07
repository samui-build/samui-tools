import { Button, Stack } from '@mantine/core'
import { EditWebhookRequest, Webhook } from 'helius-sdk'
import { HeliusUiWebhookFormUpdate } from './helius-ui-webhook-form-update.tsx'

export function HeliusUiWebhookListItem({
  webhook,
  delete: deleteItem,
  update,
  updateLoading,
}: {
  webhook: Webhook
  delete: (input: { id: string }) => Promise<boolean>
  update: (input: { id: string; payload: EditWebhookRequest }) => Promise<Webhook>
  updateLoading: boolean
}) {
  return (
    <Stack>
      <HeliusUiWebhookFormUpdate
        isLoading={updateLoading}
        submit={async (values) => {
          await update({ id: webhook.webhookID, payload: values })
        }}
        webhook={webhook}
      >
        <Button
          size="sm"
          variant="light"
          color="red"
          onClick={async () => {
            if (!window.confirm('Are you sure?')) {
              return
            }
            await deleteItem({ id: webhook.webhookID })
          }}
        >
          Delete Webhook
        </Button>
      </HeliusUiWebhookFormUpdate>
    </Stack>
  )
}
