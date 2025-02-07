import { Box, Button, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { CreateWebhookRequest, TransactionType, WebhookType } from 'helius-sdk'
import { HeliusUiWebhookFormInputAccountAddresses } from './helius-ui-webhook-form-input-account-addresses.tsx'
import { HeliusUiWebhookFormInputTransactionTypes } from './helius-ui-webhook-form-input-transaction-types.tsx'
import { HeliusUiWebhookFormInputWebhookType } from './helius-ui-webhook-form-input-webhook-type.tsx'
import { HeliusUiWebhookFormInputWebhookUrl } from './helius-ui-webhook-form-input-webhook-url.tsx'

export function HeliusUiWebhookFormCreate({
  isLoading,
  submit,
}: {
  isLoading?: boolean
  submit: (values: CreateWebhookRequest) => Promise<void>
}) {
  const form = useForm<CreateWebhookRequest>({
    initialValues: {
      accountAddresses: [],
      webhookURL: '',
      webhookType: WebhookType.ENHANCED,
      transactionTypes: [TransactionType.ANY],
    },
    validate: {
      transactionTypes: (value) => (value.length === 0 ? 'Please provide at least one transaction type' : null),
      webhookURL: (value) => (value.length === 0 ? 'Please provide a webhook URL' : null),
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values).then(() => form.reset()))}>
      <Box
        component="fieldset"
        disabled={isLoading}
        style={{ display: 'flex', flexDirection: 'column', gap: 10, border: 0, padding: 0, margin: 0 }}
      >
        <HeliusUiWebhookFormInputWebhookUrl key={form.key('webhookURL')} {...form.getInputProps('webhookURL')} />
        <HeliusUiWebhookFormInputWebhookType key={form.key('webhookType')} {...form.getInputProps('webhookType')} />
        <HeliusUiWebhookFormInputTransactionTypes
          key={form.key('transactionTypes')}
          {...form.getInputProps('transactionTypes')}
        />
        <HeliusUiWebhookFormInputAccountAddresses
          key={form.key('accountAddresses')}
          {...form.getInputProps('accountAddresses')}
        />

        <Group justify="flex-end">
          <Button disabled={!form.isValid} type="submit">
            Create
          </Button>
        </Group>
      </Box>
    </form>
  )
}
