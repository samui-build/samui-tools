import { useInvalidateFetchCollectionsByUpdateAuthority } from '@/features/mpl-core/data-access/fetch'
import { pluginTypeFromAssetPluginKey, typeToLabel } from '@/features/mpl-core/data-access/plugin.ts'
import { capitalizeFirstLetter } from '@/features/mpl-core/data-access/string.ts'
import { validatePubkey } from '@/features/mpl-core/ui/form.ts'
import { useUmi } from '@/features/solana'

import { ActionIcon, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import {
  addCollectionPluginV1,
  addressPluginAuthority,
  approveCollectionPluginAuthorityV1,
  AssetPluginKey,
  CollectionV1,
  createPlugin,
} from '@metaplex-foundation/mpl-core'
import { publicKey, TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { LucideShare } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

export function Approve({
  collection,
  type,
  create,
  pluginArgs,
}: {
  collection: CollectionV1
  type: AssetPluginKey
  create?: boolean
  pluginArgs?: any
}) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const { invalidate } = useInvalidateFetchCollectionsByUpdateAuthority()
  const form = useForm({
    initialValues: {
      destination: '',
    },
    validateInputOnBlur: true,
    validate: {
      destination: (value) => (validatePubkey(value) ? null : 'Invalid public key'),
    },
  })
  const typeLabel = useMemo(() => typeToLabel(type), [type])

  const handleApprove = useCallback(async () => {
    try {
      setLoading(true)
      let tx: TransactionBuilder = transactionBuilder()
      const pluginType = capitalizeFirstLetter(type) as any

      if (create) {
        tx = addCollectionPluginV1(umi, {
          collection: collection.publicKey,
          plugin: createPlugin({
            type: pluginType,
            data: pluginArgs,
          }),
        })
      }

      tx = tx.add(
        approveCollectionPluginAuthorityV1(umi, {
          collection: collection.publicKey,
          pluginType: pluginTypeFromAssetPluginKey(type),
          newAuthority: addressPluginAuthority(publicKey(form.values.destination)),
        }),
      )

      const res = await tx.sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('Approve complete', sig)
      notifications.show({ title: 'Approve complete', message: sig, color: 'green' })
      await invalidate(umi.identity.publicKey)
    } catch (error: unknown) {
      console.error('Approve failed', error)
      notifications.show({
        title: 'Approve failed',
        message: error instanceof Error ? error.message : String(error),
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }, [umi, form.values.destination, collection])
  return (
    <TextInput
      description={`This delegate can manage ${typeLabel} on your collection on your behalf`}
      placeholder="Wallet address"
      {...form.getInputProps('destination')}
      rightSection={
        <ActionIcon onClick={handleApprove} disabled={!form.isValid()} loading={loading}>
          <LucideShare />
        </ActionIcon>
      }
    />
  )
}
