import { useInvalidateFetchAssetWithCollection } from '@/features/mpl-core/data-access'
import { AssetWithCollection } from '@/features/mpl-core/data-access/type.ts'
import { validatePubkey } from '@/features/mpl-core/ui/form.ts'
import { useUmi } from '@/features/solana'
import { ActionIcon, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { collectionAddress, transferV1 } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { LucideSend } from 'lucide-react'
import { useCallback, useState } from 'react'

export function Transfer({ asset }: AssetWithCollection) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const { invalidate } = useInvalidateFetchAssetWithCollection()
  const form = useForm({
    initialValues: {
      destination: '',
    },
    validateInputOnBlur: true,
    validate: {
      destination: (value) => (validatePubkey(value) ? null : 'Invalid public key'),
    },
  })

  const handleTransfer = useCallback(async () => {
    try {
      setLoading(true)
      const res = await transferV1(umi, {
        asset: asset.publicKey,
        newOwner: publicKey(form.values.destination),
        collection: collectionAddress(asset),
      }).sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('Transfer complete', sig)
      notifications.show({ title: 'Transfer complete', message: sig, color: 'green' })
      await invalidate(asset.publicKey)
    } catch (error: unknown) {
      console.error('Transfer failed', error)
      notifications.show({
        title: 'Transfer failed',
        message: error instanceof Error ? error.message : String(error),
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }, [umi, form.values.destination, asset])
  return (
    <TextInput
      label="Transfer destination"
      description="Use transfer delegate to transfer the asset"
      placeholder="Wallet address"
      {...form.getInputProps('destination')}
      rightSection={
        <ActionIcon onClick={handleTransfer} disabled={!form.isValid()} loading={loading}>
          <LucideSend />
        </ActionIcon>
      }
    />
  )
}
