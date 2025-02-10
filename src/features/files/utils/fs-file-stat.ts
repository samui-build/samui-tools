import { PromisifiedFS, Stats } from '@isomorphic-git/lightning-fs'
import { fsAssertFileExists } from './fs-assert-file-exists.ts'

export async function fsFileStat(fs: PromisifiedFS, path: string): Promise<Stats> {
  // Ensure the file exists
  await fsAssertFileExists(fs, path)

  try {
    return await fs.stat(path)
  } catch (error) {
    console.log('error', error)
    throw `Error reading file or directory: ${error}`
  }
}
