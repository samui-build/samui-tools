import { useInvalidateFetchCollectionsByUpdateAuthority } from '@/features/mpl-core/data-access/fetch.ts'
import { pluginTypeNameFromPluginKey, typeToLabel } from '@/features/mpl-core/data-access/plugin.ts'
import { useUmi } from '@/features/solana'
import { ActionIcon, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { CollectionPluginsList, CollectionV1, revokeCollectionPluginAuthority } from '@metaplex-foundation/mpl-core'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { LucideX } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

export function Revoke({ collection, type }: { collection: CollectionV1; type: keyof CollectionPluginsList }) {
  const { umi } = useUmi()
  const [loading, setLoading] = useState(false)
  const { invalidate } = useInvalidateFetchCollectionsByUpdateAuthority()
  const typeLabel = useMemo(() => typeToLabel(type), [type])
  const delegate = useMemo(() => {
    switch (collection[type]?.authority?.type) {
      case 'Address':
        return collection[type]?.authority?.address
      case 'UpdateAuthority':
        return 'Update Authority'
      case 'Owner':
        return 'Owner'
      case 'None':
      default:
        return 'None'
    }
  }, [collection, type])

  const handleRevoke = useCallback(async () => {
    try {
      setLoading(true)
      const res = await revokeCollectionPluginAuthority(umi, {
        collection: collection.publicKey,
        plugin: {
          type: pluginTypeNameFromPluginKey(type),
        },
      }).sendAndConfirm(umi)

      const sig = base58.deserialize(res.signature)
      console.log('Revoke complete', sig)
      notifications.show({ title: 'Revoke complete', message: sig, color: 'green' })
      await invalidate(umi.identity.publicKey)
    } catch (error: unknown) {
      console.error('Revoke failed', error)
      notifications.show({ title: 'Revoke failed', message: error instanceof Error ? error.message : String(error), color: 'red' })
    } finally {
      setLoading(false)
    }
  }, [umi, collection])
  return (
    <TextInput
      description={`This delegate can manage ${typeLabel} on your collection on your behalf`}
      value={delegate}
      disabled
      rightSection={
        <ActionIcon onClick={handleRevoke} loading={loading} color="red">
          <LucideX />
        </ActionIcon>
      }
    />
  )
}
