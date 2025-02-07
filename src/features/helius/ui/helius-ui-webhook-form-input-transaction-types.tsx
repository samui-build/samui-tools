import { TagsInput, TagsInputProps } from '@mantine/core'
import { TransactionType } from 'helius-sdk'

export function HeliusUiWebhookFormInputTransactionTypes(props: TagsInputProps) {
  return (
    <TagsInput
      placeholder="Transaction Types"
      label="Transaction Types"
      data={Object.keys(TransactionType)
        .sort()
        .map((label) => ({ label, value: label.toString().toLowerCase() }))}
      {...props}
    />
  )
}
