import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { fsFileExists } from './fs-file-exists.ts'

export async function fsAssertFileExists(fs: PromisifiedFS, path: string): Promise<boolean> {
  const exists = await fsFileExists(fs, path)
  if (!exists) {
    throw `File does not exist: ${path}`
  }
  return exists
}
