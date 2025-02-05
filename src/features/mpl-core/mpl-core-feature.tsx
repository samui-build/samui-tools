import { MplCoreFeatureCreate } from '@/features/mpl-core/mpl-core-feature-create.tsx'
import { UiPageWithRoutes } from '@/ui'
import { Center, Container, Loader, Text } from '@mantine/core'
import { LucideHandMetal } from 'lucide-react'
import { Navigate, useParams } from 'react-router'
import { useFetchAssetWithCollection, useFetchCollection } from './data-access/fetch.ts'
import { MplCoreFeatureExplorer } from './mpl-core-feature-explorer.tsx'
import { ExplorerAsset } from './ui/Explorer/ExplorerAsset.tsx'
import { ExplorerCollection } from './ui/Explorer/ExplorerCollection.tsx'

export default function MplCoreFeature() {
  return (
    <UiPageWithRoutes
      title="Metaplex"
      icon={<LucideHandMetal size={24} />}
      routes={[
        { index: true, element: <Navigate to="./explorer" replace /> },
        { path: 'create', element: <MplCoreFeatureCreate /> },
        {
          path: 'explorer',
          children: [
            { index: true, element: <MplCoreFeatureExplorer /> },
            { path: ':mint', element: <MplCoreFeatureExplorerMint /> },
            { path: 'collection/:mint', element: <MplCoreFeatureExploreCollection /> },
          ],
        },
      ]}
    />
  )
}

export function MplCoreFeatureExplorerMint() {
  const { mint } = useParams() as { mint: string }
  const { error, isPending, data } = useFetchAssetWithCollection(mint)
  const { asset, collection } = data || {}
  return (
    <Container size="xl" pb="xl">
      {isPending && (
        <Center h="20vh">
          <Loader />
        </Center>
      )}
      {error && (
        <Center h="20vh">
          <Text>Asset does not exist</Text>
        </Center>
      )}
      {asset && <ExplorerAsset asset={asset} collection={collection} />}
    </Container>
  )
}

export function MplCoreFeatureExploreCollection() {
  const { mint } = useParams() as { mint: string }
  const { error, isPending, data: collection } = useFetchCollection(mint)
  return (
    <Container size="xl" pb="xl">
      {isPending && (
        <Center h="20vh">
          <Loader />
        </Center>
      )}
      {error && (
        <Center h="20vh">
          <Text>Collection does not exist</Text>
        </Center>
      )}
      {collection && <ExplorerCollection collection={collection} />}
    </Container>
  )
}
