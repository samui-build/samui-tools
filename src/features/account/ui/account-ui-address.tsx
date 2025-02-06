import { PublicKeyString } from '@/features/account/data-access'
import { UiCopyButton } from '@/ui/ui-copy-button.tsx'
import { Anchor, Group, Text, TextProps } from '@mantine/core'
import { Link } from 'react-router'

export function AccountUiAddress({
  address,
  withCopy = true,
  to,
  ...props
}: {
  address: PublicKeyString
  withCopy?: boolean
  to?: string
} & TextProps) {
  const text = <Text {...props}>{address.toString()}</Text>
  const link = to ? (
    <Anchor component={Link} to={to}>
      {text}
    </Anchor>
  ) : (
    text
  )

  return withCopy ? (
    <Group gap={0} wrap="nowrap">
      <UiCopyButton value={address.toString()} />
      {link}
    </Group>
  ) : (
    link
  )
}
