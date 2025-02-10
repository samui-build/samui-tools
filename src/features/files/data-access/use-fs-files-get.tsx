import { fsFilesGet } from '@/features/files/utils'
import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { useQuery } from '@tanstack/react-query'

export function fsFilesGetQueryKey(cwd: string) {
  return ['fsFilesGet', cwd]
}

export function useFsFilesGet(fs: PromisifiedFS, cwd: string) {
  return useQuery({
    queryKey: fsFilesGetQueryKey(cwd),
    queryFn: () => fsFilesGet(fs, cwd),
    retry: 0,
  })
}
