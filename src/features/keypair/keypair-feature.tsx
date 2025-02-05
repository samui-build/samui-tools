import { UiPageWithRoutes } from '@/ui'
import { Box, Code, Loader, Table } from '@mantine/core'
import { LucideKey } from 'lucide-react'
import { Keypair } from './data-access/keypair-db'
import { useKeypairList } from './data-access/use-token-mint-list'

export default function KeypairFeature() {
  return (
    <UiPageWithRoutes
      title="Keypairs"
      icon={<LucideKey size={24} />}
      routes={[{ index: true, element: <KeypairFeatureList /> }]}
    />
  )
}

function KeypairFeatureList() {
  const query = useKeypairList()
  return (
    <div>
      {query.isLoading ? (
        <Loader />
      ) : query.data?.length ? (
        <KeypairUiKeypairs keypairs={query.data ?? []} />
      ) : (
        <div>No keypairs found</div>
      )}
    </div>
  )
}

function KeypairUiKeypairs({ keypairs }: { keypairs: Keypair[] }) {
  return (
    <Table withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Public Key</Table.Th>
          <Table.Th>Secret</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {keypairs.map((keypair) => (
          <Table.Tr key={keypair.id}>
            <Table.Td>
              <Box component="pre" m={0} ff="monospace" size="sm">
                {keypair.publicKey.toString()}
              </Box>
            </Table.Td>
            <Table.Td>
              <Code>{keypair.secretKey?.length ? `[REDACTED]` : 'N/A'}</Code>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
