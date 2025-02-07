import { HeliusUiWebhookListItem } from '@/features/helius/ui/helius-ui-webhook-list-item.tsx'
import { HeliusUiWebhookList } from '@/features/helius/ui/helius-ui-webhook-list.tsx'
import { UiCard } from '@/ui'
import { Alert, Stack } from '@mantine/core'
import {
  useHeliusCreateWebhook,
  useHeliusDeleteWebhook,
  useHeliusGetAllWebhooks,
  useHeliusUpdateWebhook,
} from './data-access'

export function HeliusFeatureWebhooksList() {
  const query = useHeliusGetAllWebhooks()
  const mutationCreate = useHeliusCreateWebhook()
  const mutationDelete = useHeliusDeleteWebhook()
  const mutationUpdate = useHeliusUpdateWebhook()

  return (
    <Stack>
      <UiCard
        title="Webhook"
        description="Show and manage your Helius webhooks"
        isLoading={query.isLoading}
        error={query.error}
      >
        {query.data?.length ? (
          <HeliusUiWebhookList
            create={mutationCreate.mutateAsync}
            createLoading={mutationCreate.isPending}
            webhooks={query.data}
            render={(webhook) => (
              <HeliusUiWebhookListItem
                webhook={webhook}
                delete={mutationDelete.mutateAsync}
                update={mutationUpdate.mutateAsync}
                updateLoading={mutationUpdate.isPending}
              />
            )}
          />
        ) : (
          <Alert color="blue" title="No webhooks found" />
        )}
      </UiCard>
    </Stack>
  )
}
