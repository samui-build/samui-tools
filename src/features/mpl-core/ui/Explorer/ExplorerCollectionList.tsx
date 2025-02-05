import { useCluster } from '@/features/cluster/data-access'
import { useUmi } from '@/features/solana'
import { Center, Loader, SimpleGrid, Text } from '@mantine/core'
import { getCollectionV1GpaBuilder, Key } from '@metaplex-foundation/mpl-core'
import { useQuery } from '@tanstack/react-query'

import { ExplorerCollectionCard } from './ExplorerCollectionCard'

export function ExplorerCollectionList() {
  const { umi } = useUmi()
  const { cluster } = useCluster()

  const {
    error,
    isPending,
    data: collections,
  } = useQuery({
    queryKey: ['fetch-collections', cluster, umi.identity.publicKey],
    queryFn: async () => {
      try {
        const result = await getCollectionV1GpaBuilder(umi)
          .whereField('updateAuthority', umi.identity.publicKey)
          .whereField('key', Key.CollectionV1)
          .getDeserialized()
        return result
      } catch (err) {
        console.error('Error fetching collections', err)
        throw err
      }
    },
  })

  return (
    <>
      <Text size="lg">Your Core Collections</Text>
      {isPending ? (
        <Center h="20vh">
          <Loader />
        </Center>
      ) : error ? (
        <Center h="20vh" ta="center">
          <Text>There was an error fetching your Core collections.</Text>
        </Center>
      ) : collections?.length ? (
        <SimpleGrid
          cols={{
            base: 1,
            sm: 2,
            lg: 5,
            xl: 6,
          }}
        >
          {collections?.map((collection) => (
            <ExplorerCollectionCard collection={collection} key={collection.publicKey} />
          ))}
        </SimpleGrid>
      ) : (
        <Center h="20vh" ta="center">
          <Text>You don&apos;t have any Core collections.</Text>
        </Center>
      )}
    </>
  )
}
