import { fsInitialize } from '@/features/files/utils'
import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { useQuery } from '@tanstack/react-query'

export function useInitializeFs(fs: PromisifiedFS) {
  return useQuery({
    queryKey: ['initializeFs'],
    queryFn: async () => await fsInitialize(fs),
  })
}
