import { useCluster } from '@/features/cluster/data-access'
import { useUmi } from '@/features/solana'
import { AssetV1, deserializeAssetV1, getAssetV1GpaBuilder, Key } from '@metaplex-foundation/mpl-core'
import { useQuery } from '@tanstack/react-query'

export function useFetchAssetsByOwner() {
  const { umi } = useUmi()
  const { cluster } = useCluster()
  const o = umi.identity.publicKey
  return useQuery({
    queryKey: ['fetch-assets', cluster, o],
    queryFn: async () => {
      const accounts = await getAssetV1GpaBuilder(umi).whereField('owner', o).whereField('key', Key.AssetV1).get()
      // TODO use getDeserialized() instead of the following temporary workaround for devnet breaking changes
      return accounts
        .map((account) => {
          try {
            return deserializeAssetV1(account)
          } catch (e) {
            return null
          }
        })
        .filter((a) => a) as AssetV1[]
    },
  })
}
