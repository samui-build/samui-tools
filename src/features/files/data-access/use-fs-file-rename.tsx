import { fsFileRename } from '@/features/files/utils'
import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { useMutation } from '@tanstack/react-query'

export function useFsFileRename(fs: PromisifiedFS) {
  return useMutation({
    mutationFn: async (input: { path: string; newPath: string }) => await fsFileRename(fs, input.path, input.newPath),
  })
}