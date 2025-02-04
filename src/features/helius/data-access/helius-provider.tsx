import { Alert, Stack, Text } from '@mantine/core'
import { Helius, HeliusCluster } from 'helius-sdk'
import { useSetAtom } from 'jotai'
import { useAtomValue } from 'jotai/index'
import { atomWithStorage } from 'jotai/utils'
import React, { ReactNode } from 'react'
import { HeliusUiApiKeyForm } from '../ui/helius-ui-api-key-form.tsx'

export interface HeliusProviderContext {
  apiKey: string
  cluster: HeliusCluster
  helius: Helius
  setApiKey: (apiKey: string) => void
  setCluster: (cluster: HeliusCluster) => void
}

const apiKeyAtom = atomWithStorage<string>('helius-api-key', '')
const clusterAtom = atomWithStorage<HeliusCluster>('helius-cluster', 'mainnet-beta')

const HeliusContext = React.createContext<HeliusProviderContext>({} as HeliusProviderContext)

export function HeliusProvider(props: { children: ReactNode }) {
  const apiKey = useAtomValue(apiKeyAtom)
  const setApiKey = useSetAtom(apiKeyAtom)

  return apiKey.length ? (
    <Provider>{props.children}</Provider>
  ) : (
    <Stack>
      <Alert color="yellow" title="Helius API Key Required">
        <Stack>
          <Text>You need to provide a Helius API Key to use Helius.</Text>
          <HeliusUiApiKeyForm value={apiKey} submit={setApiKey} />
        </Stack>
      </Alert>
    </Stack>
  )
}

function Provider({ children }: { children: ReactNode }) {
  const apiKey = useAtomValue(apiKeyAtom)
  const setApiKey = useSetAtom(apiKeyAtom)
  const cluster = useAtomValue(clusterAtom)
  const setCluster = useSetAtom(clusterAtom)

  const helius = new Helius(apiKey, cluster)

  const value = {
    apiKey,
    cluster,
    helius,
    setApiKey,
    setCluster,
  }

  return <HeliusContext.Provider value={value}>{children}</HeliusContext.Provider>
}

export function useHelius() {
  return React.useContext(HeliusContext)
}
