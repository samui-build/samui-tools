import { ActionIcon, Box, Stack, Tooltip } from '@mantine/core'
import { LucidePlay } from 'lucide-react'
import { UiCard } from '../../ui/ui-card.tsx'
import { useHeliusGetCurrentTpsMutation } from './data-access'

export function HeliusFeatureOverviewCurrentTps() {
  const mutation = useHeliusGetCurrentTpsMutation()
  return (
    <Stack>
      <UiCard
        action={
          <Tooltip label="Execute request">
            <ActionIcon onClick={() => mutation.mutateAsync()} variant="light">
              <LucidePlay size={20} />
            </ActionIcon>
          </Tooltip>
        }
        title="Current TPS"
        description="Get current TPS"
        isLoading={mutation.isPending}
        error={mutation.error}
      >
        {mutation.data ? (
          <Box component="pre" m={0}>
            {JSON.stringify(mutation.data, null, 2)}
          </Box>
        ) : null}
      </UiCard>
    </Stack>
  )
}
