import { fsFileStat } from '@/features/files/utils'
import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { useQuery } from '@tanstack/react-query'

export function useFsStat(fs: PromisifiedFS, path: string) {
  return useQuery({
    queryKey: ['fsFileStat', path],
    queryFn: () => fsFileStat(fs, path),
    retry: 0,
  })
}