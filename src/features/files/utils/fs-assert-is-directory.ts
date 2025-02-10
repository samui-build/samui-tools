import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { fsAssertFileExists } from './fs-assert-file-exists.ts'
import { fsIsDirectory } from './fs-is-directory.ts'

export async function fsAssertIsDirectory(fs: PromisifiedFS, path: string): Promise<boolean> {
  await fsAssertFileExists(fs, path)

  const isDirectory = await fsIsDirectory(fs, path)
  if (!isDirectory) {
    throw `Not a directory: ${path}`
  }
  return isDirectory
}
