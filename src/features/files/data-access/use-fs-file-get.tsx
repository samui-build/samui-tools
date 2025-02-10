import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { useQuery } from '@tanstack/react-query'
import { fsFileGet } from '../utils'

export function useFsFileGet(fs: PromisifiedFS, path: string) {
  return useQuery({
    queryKey: ['fsFileGet', path],
    queryFn: () => fsFileGet(fs, path),
    retry: 0,
  })
}
