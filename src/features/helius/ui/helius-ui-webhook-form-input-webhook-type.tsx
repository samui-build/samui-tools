import { Select, SelectProps } from '@mantine/core'
import { WebhookType } from 'helius-sdk'

export function HeliusUiWebhookFormInputWebhookType(props: SelectProps) {
  return (
    <Select
      allowDeselect={false}
      data={Object.keys(WebhookType)
        .sort()
        .map((label) => ({ label, value: label.toString().toLowerCase() }))}
      label="Webhook Type"
      placeholder="Webhook Type"
      {...props}
    />
  )
}
