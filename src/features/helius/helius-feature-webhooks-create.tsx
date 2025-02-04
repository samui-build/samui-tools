import { Alert, Stack } from '@mantine/core'
import { UiCard } from '../../ui/ui-card.tsx'
import { useHeliusCreateWebhook } from './data-access'
import { HeliusUiWebhookCreateForm } from './ui/helius-ui-webhook-create-form.tsx'

export function HeliusFeatureWebhooksCreate() {
  const mutation = useHeliusCreateWebhook()
  return (
    <Stack>
      <UiCard title="Create" description="Create a new webhook" error={mutation.error}>
        {mutation.data ? (
          <Alert color="blue" title="Webhook created!">
            <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
          </Alert>
        ) : null}
        <HeliusUiWebhookCreateForm
          isLoading={mutation.isPending}
          submit={async (values) => {
            await mutation.mutateAsync(values)
          }}
        />
      </UiCard>
    </Stack>
  )
}
