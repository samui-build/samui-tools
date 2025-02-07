import { TagsInput, TagsInputProps } from '@mantine/core'
import { Address } from 'helius-sdk'

export function HeliusUiWebhookFormInputAccountAddresses(props: TagsInputProps) {
  return (
    <TagsInput
      placeholder="Account Addresses"
      label="Account Addresses"
      data={Object.keys(Address).sort()}
      {...props}
    />
  )
}
