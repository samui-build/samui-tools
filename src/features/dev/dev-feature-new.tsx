import { Alert, Box, Stack, Text } from '@mantine/core'

export function DevFeatureNew() {
  return (
    <Box h="100%" style={{ overflow: 'auto' }}>
      <Alert title="Dev Feature" color="blue">
        <Stack>
          <Text size="sm">The development section is a scratchpad for new features that are being developed.</Text>
          <Text size="sm">
            Use this component as a reference for building new features in this development environment.
          </Text>
        </Stack>
      </Alert>
    </Box>
  )
}
