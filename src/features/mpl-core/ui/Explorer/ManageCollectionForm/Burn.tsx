import { useInvalidateFetchCollection } from '@/features/mpl-core/data-access/fetch'
import { useUmi } from '@/features/solana'
import { Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { burnCollectionV1, CollectionV1 } from '@metaplex-foundation/mpl-core'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useCallback, useState } from 'react'

export function Burn({ collection }: { collection: CollectionV1 }) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const { invalidate } = useInvalidateFetchCollection()

  const handleBurn = useCallback(async () => {
    try {
      setLoading(true)
      const res = await burnCollectionV1(umi, {
        collection: collection.publicKey,
        compressionProof: null,
      }).sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('Burn complete', sig)
      notifications.show({ title: 'Burn complete', message: sig, color: 'green' })
      await invalidate(collection.publicKey)
    } catch (error: unknown) {
      console.error('Burn failed', error)
      notifications.show({ title: 'Burn failed', message: error instanceof Error ? error.message : String(error), color: 'red' })
    } finally {
      setLoading(false)
    }
  }, [umi, collection])
  return (
    <Button onClick={handleBurn} loading={loading} color="red">
      Burn
    </Button>
  )
}
