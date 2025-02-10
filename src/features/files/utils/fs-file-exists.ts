import { PromisifiedFS } from '@isomorphic-git/lightning-fs'

export async function fsFileExists(fs: PromisifiedFS, path: string): Promise<boolean> {
  try {
    await fs.stat(path)
    return true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false
  }
}
