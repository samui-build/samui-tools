import { useAssetJson } from '@/features/mpl-core/ui/Explorer/use-asset-json.tsx'
import { CodeHighlightTabs } from '@mantine/code-highlight'
import { ActionIcon, Center, Group, Image, Loader, Modal, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CollectionV1 } from '@metaplex-foundation/mpl-core'

import { useWallet } from '@solana/wallet-adapter-react'
import { LucideSettings } from 'lucide-react'

import { ExplorerStat } from './ExplorerStat'
import { ManageCollectionForm } from './ManageCollectionForm/ManageCollectionForm'

export function ExplorerCollectionDetails({ collection }: { collection: CollectionV1 }) {
  const { connected } = useWallet()
  const jsonInfo = useAssetJson(collection)
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <Stack>
      <Group justify="space-between">
        <Text fz="md" tt="uppercase" fw={700} c="dimmed">
          Collection Details
        </Text>
        <ActionIcon
          variant="subtle"
          color="rgba(145, 145, 145, 1)"
          disabled={!connected}
          onClick={() => {
            open()
          }}
        >
          <LucideSettings />
        </ActionIcon>
      </Group>
      {jsonInfo.isPending ? (
        <Center h="20vh">
          <Loader />
        </Center>
      ) : (
        <>
          <Title>{jsonInfo?.data?.name || collection.name}</Title>

          {jsonInfo.data?.image && <Image src={jsonInfo.data.image} maw={320} />}
          {jsonInfo.data?.description && <ExplorerStat label="Description" value={jsonInfo.data?.description} />}
          <ExplorerStat label="Mint" value={collection.publicKey} copyable />
          <ExplorerStat label="Update authority" value={collection.updateAuthority} copyable />

          <ExplorerStat label="Metadata URI" value={collection.uri} copyable asExternalLink={collection.uri} />

          {jsonInfo.data && (
            <CodeHighlightTabs
              withExpandButton
              expandCodeLabel="Show full JSON"
              collapseCodeLabel="Show less"
              defaultExpanded={false}
              mb="lg"
              code={[
                {
                  fileName: 'metadata.json',
                  language: 'json',
                  code: JSON.stringify(jsonInfo.data, null, 2),
                },
              ]}
            />
          )}
        </>
      )}
      <Modal opened={opened} onClose={close} centered title="Advanced collection settings" size="70%">
        <ManageCollectionForm collection={collection} />
      </Modal>
    </Stack>
  )
}
