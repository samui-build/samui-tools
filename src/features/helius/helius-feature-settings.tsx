import { Button, Paper, Stack, Title } from '@mantine/core'
import { useState } from 'react'
import { useHelius } from './data-access/helius-provider.tsx'
import { HeliusUiApiKeyForm } from './ui/helius-ui-api-key-form.tsx'

export function HeliusFeatureSettings() {
  const { helius, apiKey, setApiKey } = useHelius()
  const [result, setResult] = useState<unknown>()
  return (
    <Stack>
      <Title order={3}>Settings</Title>
      <HeliusUiApiKeyForm value={apiKey} submit={setApiKey} />
      <Paper p="md" withBorder shadow="sm">
        <Button
          onClick={async () => {
            console.log(helius)
            await helius.rpc.getLatestBlockhash().then((res) => {
              setResult({ getLatestBlockhash: res })
            })
          }}
        >
          Test
        </Button>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Paper>
    </Stack>
  )
}
