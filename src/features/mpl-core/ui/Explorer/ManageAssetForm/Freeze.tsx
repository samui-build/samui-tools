import { useInvalidateFetchAssetWithCollection } from '@/features/mpl-core/data-access'
import { AssetWithCollection } from '@/features/mpl-core/data-access/type.ts'
import { useUmi } from '@/features/solana'
import { Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { addPluginV1, collectionAddress, createPlugin, updatePluginV1 } from '@metaplex-foundation/mpl-core'
import { TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useCallback, useState } from 'react'

export function Freeze({ asset }: AssetWithCollection) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const { invalidate } = useInvalidateFetchAssetWithCollection()
  const frozen = asset.freezeDelegate?.frozen

  const handleFreeze = useCallback(async () => {
    try {
      setLoading(true)
      let tx: TransactionBuilder = transactionBuilder()

      if (!asset.freezeDelegate) {
        tx = addPluginV1(umi, {
          asset: asset.publicKey,
          collection: collectionAddress(asset),
          plugin: createPlugin({
            type: 'FreezeDelegate',
            data: {
              frozen: true,
            },
          }),
        })
      } else {
        tx = updatePluginV1(umi, {
          asset: asset.publicKey,
          collection: collectionAddress(asset),
          plugin: createPlugin({
            type: 'FreezeDelegate',
            data: {
              frozen: !frozen,
            },
          }),
        })
      }

      const res = await tx.sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('Freeze/unfreeze complete', sig)
      notifications.show({ title: `${frozen ? 'Unfreeze' : 'Freeze'} complete`, message: sig, color: 'green' })
      await invalidate(asset.publicKey)
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
  }, [umi, asset])
  return (
    <Button onClick={handleFreeze} loading={loading}>
      {frozen ? 'Unfreeze' : 'Freeze'}
    </Button>
  )
}
