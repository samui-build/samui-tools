import { useInvalidateFetchCollectionsByUpdateAuthority } from '@/features/mpl-core/data-access/fetch.ts'
import { useUmi } from '@/features/solana'
import { Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { CollectionV1, createPlugin, updateCollectionPluginV1 } from '@metaplex-foundation/mpl-core'
import { TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useCallback, useState } from 'react'

export function PermanentFreeze({ collection }: { collection: CollectionV1 }) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const { invalidate } = useInvalidateFetchCollectionsByUpdateAuthority()
  const frozen = collection.permanentFreezeDelegate?.frozen

  const handleFreeze = useCallback(async () => {
    try {
      setLoading(true)
      let tx: TransactionBuilder = transactionBuilder()

      if (!collection.permanentFreezeDelegate) {
        return
      }

      tx = updateCollectionPluginV1(umi, {
        collection: collection.publicKey,
        plugin: createPlugin({
          type: 'PermanentFreezeDelegate',
          data: {
            frozen: !frozen,
          },
        }),
      })

      const res = await tx.sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('Freeze/unfreeze complete', sig)
      notifications.show({ title: `${frozen ? 'Unfreeze' : 'Freeze'} complete`, message: sig, color: 'green' })
      await invalidate(collection.publicKey)
    } catch (error: unknown) {
      console.error('Freeze/unfreeze failed', error)
      notifications.show({
        title: `${frozen ? 'Unfreeze' : 'Freeze'} failed`,
        message: error instanceof Error ? error.message : String(error),
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }, [umi, collection])
  return (
    <Button onClick={handleFreeze} loading={loading} disabled={!collection.permanentFreezeDelegate}>
      {frozen ? 'Unfreeze' : 'Freeze'} collection
    </Button>
  )
}
