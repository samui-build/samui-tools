import { Stats } from '@isomorphic-git/lightning-fs'

export interface FsFileEntry {
  name: string
  path: string
  stat: Stats
  type: 'directory' | 'file'
}

export interface FsFileBase extends FsFileEntry {
  type: 'file'
  data: string | Uint8Array
}

export interface FsFileBinary extends FsFileBase {
  data: Uint8Array
}

export interface FsFileText extends FsFileBase {
  data: string
}

export interface FsFileDirectory extends FsFileEntry {
  type: 'directory'
}

export type FsFileBinaryOrText = FsFileBinary | FsFileText
export type FsFile = FsFileBinaryOrText | FsFileDirectory

export function fsFileDirectory(props: { name: string; path: string; stat: Stats }): FsFileDirectory {
  return { ...props, type: 'directory' }
}
