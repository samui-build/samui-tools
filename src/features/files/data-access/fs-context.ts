import { FsFileEntry } from '@/features/files/utils'
import { PromisifiedFS, Stats } from '@isomorphic-git/lightning-fs'
import { createContext, useContext } from 'react'

export interface FilesProviderContext {
  basePath: string
  path: string
  pathStat?: Stats
  pathEntry?: FsFileEntry
  fs: PromisifiedFS
}

export const FsContext = createContext<FilesProviderContext>({} as FilesProviderContext)

export function useFs() {
  return useContext(FsContext)
}
