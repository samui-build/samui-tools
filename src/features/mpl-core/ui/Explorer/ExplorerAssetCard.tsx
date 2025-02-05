import { Card, Group, Image, Skeleton, Text } from '@mantine/core'
import { AssetV1 } from '@metaplex-foundation/mpl-core'
import { Link } from 'react-router'

import classes from './ExplorerCard.module.css'
import { useAssetJson } from './use-asset-json'

export function ExplorerAssetCard({ asset }: { asset: AssetV1 }) {
  const { error, isPending, data: json } = useAssetJson(asset)

  return (
    <Link
      to={`/mpl-core/explorer/${asset.publicKey}`}
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
            <Text fw={500}>{asset.name}</Text>
          </Group>
        </Card>
      </Skeleton>
    </Link>
  )
}
