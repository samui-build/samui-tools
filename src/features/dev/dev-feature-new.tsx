import { Alert, Box } from '@mantine/core'

export function DevFeatureNew() {
  return (
    <Box h="100%" style={{ overflow: 'auto' }}>
      <Alert title="New Dev Feature" color="blue">
        Use this component as a reference for building new features in this development environment.
      </Alert>
    </Box>
  )
}
