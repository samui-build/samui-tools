import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { useMutation } from '@tanstack/react-query'
import { fsFileDelete } from '../utils'

export function useFsFileDelete(fs: PromisifiedFS) {
  return useMutation({
    mutationFn: async (input: { path: string }) => await fsFileDelete(fs, input.path),
  })
}
