import { Alert, Box } from '@mantine/core'

export function DevFeatureOverview() {
  return (
    <Box h="100%" style={{ overflow: 'auto' }}>
      <Alert title="Dev Overview" color="blue">
        The development section is a scratchpad for new features that are being developed.
      </Alert>
    </Box>
  )
}