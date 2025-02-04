import { Anchor, Box, Button, Group, Select, TagsInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Address, CreateWebhookRequest, TransactionType, TxnStatus, WebhookType } from 'helius-sdk'
import { AccountWebhookEncoding } from 'helius-sdk/dist/src/types/enums'

export function HeliusUiWebhookCreateForm({
  isLoading,
  submit,
}: {
  isLoading?: boolean
  submit: (values: CreateWebhookRequest) => Promise<void>
}) {
  const form = useForm<CreateWebhookRequest>({
    initialValues: {
      encoding: AccountWebhookEncoding.JSON_PARSED,
      txnStatus: TxnStatus.SUCCESS,
      // authHeader: ' THIS IS A SECRET ',
      accountAddresses: [],
      accountAddressOwners: [],
      webhookURL: '',
      webhookType: WebhookType.ENHANCED,
      transactionTypes: [TransactionType.ANY],
    },
    validate: {
      transactionTypes: (value) => (value.length === 0 ? 'Please provide at least one transaction type' : null),
      webhookURL: (value) => (value.length === 0 ? 'Please provide a webhook URL' : null),
    },
  })

  const services = ['https://typedwebhook.tools', 'https://webhook.site', 'https://postb.in']

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <Box
        component="fieldset"
        disabled={isLoading}
        style={{ display: 'flex', flexDirection: 'column', gap: 10, border: 0, padding: 0, margin: 0 }}
      >
        <TextInput
          type="text"
          label="Webhook URL"
          description={
            <>
              The URL to which the webhook will send POST requests. The URL must be publicly accessible and support POST
              requests. Get a debug webhook here:
              {services.map((service, index) => (
                <Anchor key={index} href={service} target="_blank" rel="noopener noreferrer" size="xs" mx={2}>
                  {service.replace('https://', '')}
                </Anchor>
              ))}
              .
            </>
          }
          placeholder="Webhook URL"
          key={form.key('webhookURL')}
          {...form.getInputProps('webhookURL')}
        />
        <Select
          data={Object.keys(WebhookType).sort()}
          label="Webhook Type"
          placeholder="Webhook Type"
          key={form.key('webhookType')}
          {...form.getInputProps('webhookType')}
        />
        <TagsInput
          placeholder="Transaction Types"
          label="Transaction Types"
          data={Object.keys(TransactionType).sort()}
          key={form.key('transactionTypes')}
          {...form.getInputProps('transactionTypes')}
        />
        <TagsInput
          placeholder="Account Addresses"
          label="Account Addresses"
          data={Object.keys(Address).sort()}
          key={form.key('accountAddresses')}
          {...form.getInputProps('accountAddresses')}
        />
        <TagsInput
          placeholder="Account Address Owners"
          label="Account Address Owners"
          key={form.key('accountAddressOwners')}
          {...form.getInputProps('accountAddressOwners')}
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
