import { useCluster } from '@/features/cluster/data-access'
import { useUmi } from '@/features/solana'
import {
  AssetV1,
  collectionAddress,
  CollectionV1,
  deserializeAssetV1,
  deserializeCollectionV1,
  fetchAssetV1,
  fetchCollectionV1,
  getAssetV1GpaBuilder,
  getCollectionV1GpaBuilder,
  Key,
  updateAuthority,
} from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useFetchAsset(mint: string) {
  const { umi } = useUmi()
  const { cluster } = useCluster()
  return useQuery({
    retry: false,
    refetchOnMount: true,
    queryKey: ['fetch-nft', cluster, mint],
    queryFn: async () => fetchAssetV1(umi, publicKey(mint)),
  })
}

export function useFetchCollection(mint?: string) {
  const { umi } = useUmi()
  const { cluster } = useCluster()
  if (!mint) return { isPending: false, error: undefined, isLoading: false, isError: false, data: undefined }
  return useQuery({
    retry: false,
    refetchOnMount: true,
    queryKey: ['fetch-collection', cluster, mint],
    queryFn: async () => fetchCollectionV1(umi, publicKey(mint)),
  })
}

export function useInvalidateFetchCollection() {
  const { cluster } = useCluster()
  const queryClient = useQueryClient()

  return {
    invalidate: (mint: string) => queryClient.invalidateQueries({ queryKey: ['fetch-collection', cluster, mint] }),
  }
}

export function useInvalidateFetchAssetWithCollection() {
  const { cluster } = useCluster()
  const queryClient = useQueryClient()

  return {
    invalidate: (mint: string) =>
      queryClient.invalidateQueries({ queryKey: ['fetch-asset-with-collection', cluster, mint] }),
  }
}

export function useFetchAssetWithCollection(mint: string) {
  const { umi } = useUmi()
  const { cluster } = useCluster()

  return useQuery({
    retry: false,
    refetchOnMount: true,
    queryKey: ['fetch-asset-with-collection', cluster, mint],
    queryFn: async () => {
      const asset = await fetchAssetV1(umi, publicKey(mint))
      const colAddr = collectionAddress(asset)
      let collection
      if (colAddr) {
        collection = await fetchCollectionV1(umi, colAddr)
      }
      return { asset, collection }
    },
  })
}

export function useFetchAssetsByOwner(owner?: string) {
  const { umi } = useUmi()
  const { cluster } = useCluster()
  const o = owner ? publicKey(owner) : umi.identity.publicKey
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

export function useFetchAssetsByCollection(collection: string) {
  const { umi } = useUmi()
  const { cluster } = useCluster()
  return useQuery({
    queryKey: ['fetch-assets-by-collection', cluster, collection],
    queryFn: async () => {
      const accounts = await getAssetV1GpaBuilder(umi)
        .whereField('updateAuthority', updateAuthority('Collection', [publicKey(collection)]))
        .whereField('key', Key.AssetV1)
        .get()
      return accounts
        .map((account) => {
          try {
            // TODO use getDeserialized() instead of the following temporary workaround for devnet breaking changes
            return deserializeAssetV1(account)
          } catch (e) {
            return null
          }
        })
        .filter((a) => a) as AssetV1[]
    },
  })
}

export function useInvalidateFetchCollectionsByUpdateAuthority() {
  const { cluster } = useCluster()
  const queryClient = useQueryClient()

  return {
    invalidate: (updateAuth: string) =>
      queryClient.invalidateQueries({ queryKey: ['fetch-asset-with-collection', cluster, updateAuth] }),
  }
}

export function useFetchCollectionsByUpdateAuthority(updateAuth: string) {
  const { umi } = useUmi()
  const { cluster } = useCluster()
  return useQuery({
    queryKey: ['fetch-collections', cluster, updateAuth],
    queryFn: async () => {
      try {
        const accounts = await getCollectionV1GpaBuilder(umi)
          .whereField('updateAuthority', publicKey(updateAuth))
          .whereField('key', Key.CollectionV1)
          .get()
        // TODO use getDeserialized() instead of the following temporary workaround for devnet breaking changes
        return accounts
          .map((account) => {
            try {
              return deserializeCollectionV1(account)
            } catch (e) {
              return null
            }
          })
          .filter((a) => a) as CollectionV1[]
      } catch (err) {
        console.error('Error fetching collections', err)
        throw err
      }
    },
  })
}
