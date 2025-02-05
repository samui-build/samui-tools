import { useInvalidateFetchAssetWithCollection } from '@/features/mpl-core/data-access'
import { typeToLabel } from '@/features/mpl-core/data-access/plugin.ts'
import { AssetWithCollection } from '@/features/mpl-core/data-access/type'
import { validatePubkey } from '@/features/mpl-core/ui/form.ts'
import { useUmi } from '@/features/solana'
import { ActionIcon, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import {
  addPluginV1,
  addressPluginAuthority,
  approvePluginAuthorityV1,
  AssetPluginKey,
  collectionAddress,
  createPlugin,
  pluginTypeFromAssetPluginKey,
} from '@metaplex-foundation/mpl-core'
import { capitalizeFirstLetter } from '@metaplex-foundation/mpl-core/dist/src/utils'
import { publicKey, TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { LucideShare } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

export function Approve({
  asset,
  type,
  create,
  pluginArgs,
}: AssetWithCollection & {
  type: AssetPluginKey
  create?: boolean
  pluginArgs?: any
}) {
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
  const typeLabel = useMemo(() => typeToLabel(type), [type])

  const handleApprove = useCallback(async () => {
    try {
      setLoading(true)
      let tx: TransactionBuilder = transactionBuilder()
      const pluginType = capitalizeFirstLetter(type) as any

      if (create) {
        tx = addPluginV1(umi, {
          asset: asset.publicKey,
          collection: collectionAddress(asset),
          plugin: createPlugin({
            type: pluginType,
            data: pluginArgs,
          }),
        })
      }

      tx = tx.add(
        approvePluginAuthorityV1(umi, {
          asset: asset.publicKey,
          collection: collectionAddress(asset),
          pluginType: pluginTypeFromAssetPluginKey(type),
          newAuthority: addressPluginAuthority(publicKey(form.values.destination)),
        }),
      )

      const res = await tx.sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('Approve complete', sig)
      notifications.show({ title: 'Approve complete', message: sig, color: 'green' })
      await invalidate(asset.publicKey)
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
  }, [umi, form.values.destination, asset])
  return (
    <TextInput
      description={`This delegate can manage ${typeLabel} on your asset on your behalf`}
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
