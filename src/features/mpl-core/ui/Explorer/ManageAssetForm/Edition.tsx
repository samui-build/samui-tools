import { useInvalidateFetchAssetWithCollection } from '@/features/mpl-core/data-access'
import { AssetWithCollection } from '@/features/mpl-core/data-access/type.ts'
import { useUmi } from '@/features/solana'
import { Button, NumberInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { addPluginV1, collectionAddress, createPlugin, updatePluginV1 } from '@metaplex-foundation/mpl-core'
import { TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useCallback, useState } from 'react'

export function Edition({ asset }: AssetWithCollection) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const { invalidate } = useInvalidateFetchAssetWithCollection()
  const form = useForm({
    initialValues: {
      number: asset.edition?.number ?? 0,
    },
    validateInputOnBlur: true,
    validate: {},
  })

  const handleAttributes = useCallback(async () => {
    try {
      setLoading(true)
      let tx: TransactionBuilder = transactionBuilder()

      if (!asset.edition) {
        tx = addPluginV1(umi, {
          asset: asset.publicKey,
          collection: collectionAddress(asset),
          plugin: createPlugin({
            type: 'Edition',
            data: {
              number: form.values.number,
            },
          }),
        })
      } else {
        tx = updatePluginV1(umi, {
          asset: asset.publicKey,
          collection: collectionAddress(asset),
          plugin: createPlugin({
            type: 'Edition',
            data: {
              number: form.values.number,
            },
          }),
        })
      }

      const res = await tx.sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('Edition complete', sig)
      notifications.show({ title: 'Edition complete', message: sig, color: 'green' })
      await invalidate(asset.publicKey)
    } catch (error: unknown) {
      console.error('Edition failed', error)
      notifications.show({
        title: 'Edition failed',
        message: error instanceof Error ? error.message : String(error),
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }, [umi, form.values.number, asset])
  return (
    <Stack gap="xs">
      <NumberInput value={form.values.number} defaultValue="" {...form.getInputProps(`number`)} />

      <Button
        // placeholder="Wallet address"
        {...form.getInputProps('destination')}
        loading={loading}
        disabled={!form.isValid()}
        onClick={handleAttributes}
      >
        Update edition
      </Button>
    </Stack>
  )
}
