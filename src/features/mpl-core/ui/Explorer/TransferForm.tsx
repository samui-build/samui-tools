import { validatePubkey } from '@/features/mpl-core/ui/form.ts'
import { useUmi } from '@/features/solana'
import { Button, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { AssetV1, collectionAddress, transferV1 } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useCallback, useState } from 'react'

export function TransferForm({ asset, onComplete }: { asset: AssetV1; onComplete?: () => void }) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      destination: '',
    },
    validate: {
      destination: (value) => (validatePubkey(value) ? null : 'Invalid public key'),
    },
  })

  const handleTransfer = useCallback(async () => {
    try {
      setLoading(true)
      const collection = collectionAddress(asset)
      const res = await transferV1(umi, {
        asset: asset.publicKey,
        newOwner: publicKey(form.values.destination),
        collection,
      }).sendAndConfirm(umi)
      const sig = base58.deserialize(res.signature)
      console.log(sig)
      notifications.show({ title: 'Transfer complete', message: sig, color: 'green' })
      onComplete?.()
    } catch (error: unknown) {
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
    <>
      <Stack>
        <TextInput label="Destination" placeholder="Wallet address" {...form.getInputProps('destination')} />
        <Button onClick={handleTransfer} loading={loading} disabled={!form.isValid()}>
          Transfer
        </Button>
      </Stack>
    </>
  )
}
