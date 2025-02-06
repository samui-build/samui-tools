import { toastSuccess } from '@/ui'
import { Anchor } from '@mantine/core'
import { NotificationData } from '@mantine/notifications'

export function uiToastLink({
  label,
  link,
  ...props
}: Omit<NotificationData, 'message'> & { link: string; label: string }) {
  return toastSuccess({
    ...props,
    message: (
      <Anchor c="brand" href={link} target="_blank" rel="noopener noreferrer">
        {label}
      </Anchor>
    ),
  })
}
