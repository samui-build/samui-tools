import { useInvalidateFetchAssetWithCollection } from '@/features/mpl-core/data-access'
import { AssetWithCollection } from '@/features/mpl-core/data-access/type.ts'
import { validateUri } from '@/features/mpl-core/ui/form.ts'
import { useUmi } from '@/features/solana'

import { Button, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { collectionAddress, updateV1 } from '@metaplex-foundation/mpl-core'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useCallback, useState } from 'react'

export function Update({ asset }: AssetWithCollection) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const { invalidate } = useInvalidateFetchAssetWithCollection()
  const form = useForm({
    initialValues: {
      name: asset.name,
      uri: asset.uri,
    },
    validateInputOnBlur: true,
    validate: {
      uri: (value) => (validateUri(value) ? null : 'Invalid URI'),
    },
  })

  const handleUpdate = useCallback(async () => {
    try {
      setLoading(true)
      const res = await updateV1(umi, {
        asset: asset.publicKey,
        newName: form.values.name,
        newUri: form.values.uri,
        collection: collectionAddress(asset),
      }).sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('Update complete', sig)
      notifications.show({ title: 'Update complete', message: sig, color: 'green' })
      await invalidate(asset.publicKey)
    } catch (error: unknown) {
      console.error('Update failed', error)
      notifications.show({
        title: 'Update failed',
        message: error instanceof Error ? error.message : String(error),
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }, [umi, form.values.name, form.values.uri, asset])
  return (
    <Stack gap="xs">
      <TextInput label="Name" {...form.getInputProps('name')} />
      <TextInput label="Uri" {...form.getInputProps('uri')} />
      <Button onClick={handleUpdate} loading={loading}>
        Update
      </Button>
    </Stack>
  )
}
