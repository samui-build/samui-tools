import { UiCard } from '@/ui'
import { Alert, Stack } from '@mantine/core'
import { useHeliusCreateWebhook } from './data-access'
import { HeliusUiWebhookFormCreate } from './ui/helius-ui-webhook-form-create.tsx'

export function HeliusFeatureWebhooksCreate() {
  const mutationCreate = useHeliusCreateWebhook()

  return (
    <Stack>
      <UiCard title="Create" description="Create a new webhook" error={mutationCreate.error}>
        {mutationCreate.data ? (
          <Alert color="blue" title="Webhook created!">
            <pre>{JSON.stringify(mutationCreate.data, null, 2)}</pre>
          </Alert>
        ) : null}
        <HeliusUiWebhookFormCreate
          isLoading={mutationCreate.isPending}
          submit={async (values) => {
            await mutationCreate.mutateAsync(values)
          }}
        />
      </UiCard>
    </Stack>
  )
}
