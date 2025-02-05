import { AssetV1 } from '@metaplex-foundation/mpl-core'
import { useQuery } from '@tanstack/react-query'

export function useAssetJson(asset: Pick<AssetV1, 'publicKey' | 'uri'>) {
  return useQuery({
    queryKey: ['fetch-asset-json', asset.publicKey],
    queryFn: async () => {
      const j = await (await fetch(asset.uri)).json()
      return j
    },
  })
}