import { Box, Card, Group, Skeleton, Text } from '@mantine/core'
import { ReactNode } from 'react'
import { UiError } from './ui-error.tsx'

export function UiCard({
  children,
  action,
  title,
  description,
  isLoading = false,
  error,
}: {
  title: string
  children: ReactNode
  action?: ReactNode
  description: string
  isLoading?: boolean
  error?: Error | null
}) {
  return (
    <Card p="md" withBorder shadow="sm">
      <Card.Section p="md">
        <Group justify="space-between">
          <Box>
            <Text size="xl" fw={500}>
              {title}
            </Text>
            <Text size="sm" c={'dimmed'}>
              {description}
            </Text>
          </Box>
          {action}
        </Group>
      </Card.Section>
      {error ? <UiError mb="lg" error={error} /> : null}
      {children || isLoading ? <Skeleton visible={isLoading}>{children}</Skeleton> : null}
    </Card>
  )
}
