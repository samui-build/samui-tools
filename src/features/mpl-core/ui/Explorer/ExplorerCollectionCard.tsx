import { Card, Flex, Group, Image, Skeleton, Text, ThemeIcon } from '@mantine/core'
import { CollectionV1 } from '@metaplex-foundation/mpl-core'
import { LucideSnowflake } from 'lucide-react'
import { Link } from 'react-router'

import classes from './ExplorerCard.module.css'
import { useAssetJson } from './use-asset-json'

export function ExplorerCollectionCard({ collection }: { collection: CollectionV1 }) {
  const { error, isPending, data: json } = useAssetJson(collection)

  return (
    <Link
      to={`/mpl-core/explorer/collection/${collection.publicKey}`}
      style={{
        textDecoration: 'none',
      }}
    >
      <Skeleton visible={isPending} className={classes.cardContainer}>
        <Card shadow="sm" padding="lg" radius="md">
          <Card.Section>
            <Skeleton visible={!!error}>
              <Image src={json?.image} height={200} />
            </Skeleton>
          </Card.Section>
          <Group justify="space-between" mt="md">
            <Text fw={500}>{collection.name}</Text>
            <Flex>
              {collection.permanentFreezeDelegate?.frozen && (
                <ThemeIcon>
                  <LucideSnowflake />
                </ThemeIcon>
              )}
            </Flex>
          </Group>
        </Card>
      </Skeleton>
    </Link>
  )
}
