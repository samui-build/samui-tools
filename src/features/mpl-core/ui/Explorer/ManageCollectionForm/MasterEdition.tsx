import { useInvalidateFetchCollectionsByUpdateAuthority } from '@/features/mpl-core/data-access/fetch.ts'
import { useUmi } from '@/features/solana'
import { Button, Group, NumberInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import {
  addCollectionPluginV1,
  CollectionV1,
  createPlugin,
  updateCollectionPluginV1,
} from '@metaplex-foundation/mpl-core'
import { none, TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useCallback, useState } from 'react'

export function MasterEdition({ collection }: { collection: CollectionV1 }) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const { invalidate } = useInvalidateFetchCollectionsByUpdateAuthority()
  const form = useForm({
    initialValues: {
      maxSupply: collection.masterEdition?.maxSupply,
      name: collection.masterEdition?.name,
      uri: collection.masterEdition?.uri,
    },
    validateInputOnBlur: true,
    validate: {},
  })
  console.log('MasterEdition')
  const handleMasterEdition = useCallback(async () => {
    try {
      setLoading(true)
      let tx: TransactionBuilder = transactionBuilder()

      if (!collection.masterEdition) {
        tx = addCollectionPluginV1(umi, {
          collection: collection.publicKey,
          plugin: createPlugin({
            type: 'MasterEdition',
            data: {
              maxSupply: form.values.maxSupply || none(),
              name: form.values.name || none(),
              uri: form.values.uri || none(),
            },
          }),
        })
      } else {
        tx = updateCollectionPluginV1(umi, {
          collection: collection.publicKey,
          plugin: createPlugin({
            type: 'MasterEdition',
            data: {
              maxSupply: form.values.maxSupply || none(),
              name: form.values.name || none(),
              uri: form.values.uri || none(),
            },
          }),
        })
      }

      const res = await tx.sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('MasterEdition complete', sig)
      notifications.show({ title: 'MasterEdition complete', message: sig, color: 'green' })
      await invalidate(collection.publicKey)
    } catch (error: unknown) {
      console.error('MasterEdition failed', error)
      notifications.show({
        title: 'MasterEdition failed',
        message: error instanceof Error ? error.message : String(error),
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }, [umi, form.values, collection])
  return (
    <Stack gap="xs">
      <Group>
        <NumberInput value={form.values.maxSupply} defaultValue="" {...form.getInputProps(`maxSupply`)} />
        <TextInput value={form.values.name} defaultValue="" {...form.getInputProps(`name`)} />
        <TextInput value={form.values.uri} defaultValue="" {...form.getInputProps(`uri`)} />
      </Group>

      <Button
        {...form.getInputProps('destination')}
        loading={loading}
        disabled={!form.isValid()}
        onClick={handleMasterEdition}
      >
        Update Master Edition
      </Button>
    </Stack>
  )
}
