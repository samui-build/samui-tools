import { useInvalidateFetchAssetWithCollection } from '@/features/mpl-core/data-access'
import { AssetWithCollection } from '@/features/mpl-core/data-access/type.ts'
import { useUmi } from '@/features/solana'
import { Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { burnV1, collectionAddress } from '@metaplex-foundation/mpl-core'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useCallback, useState } from 'react'

export function Burn({ asset }: AssetWithCollection) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const { invalidate } = useInvalidateFetchAssetWithCollection()

  const handleBurn = useCallback(async () => {
    try {
      setLoading(true)
      const res = await burnV1(umi, {
        asset: asset.publicKey,
        collection: collectionAddress(asset),
      }).sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('Burn complete', sig)
      notifications.show({ title: 'Burn complete', message: sig, color: 'green' })
      await invalidate(asset.publicKey)
    } catch (error: unknown) {
      console.error('Burn failed', error)
      notifications.show({ title: 'Burn failed', message: error instanceof Error ? error.message : String(error), color: 'red' })
    } finally {
      setLoading(false)
    }
  }, [umi, asset])
  return (
    <Button onClick={handleBurn} loading={loading} color="red">
      Burn
    </Button>
  )
}
