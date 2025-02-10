import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { fsAssertFileExists } from './fs-assert-file-exists.ts'
import { fsIsFile } from './fs-is-file.ts'

export async function fsAssertIsFile(fs: PromisifiedFS, path: string): Promise<boolean> {
  await fsAssertFileExists(fs, path)

  const isFile = await fsIsFile(fs, path)
  if (!isFile) {
    throw `Not a file: ${path}`
  }
  return isFile
}
