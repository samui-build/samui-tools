import { PromisifiedFS } from '@isomorphic-git/lightning-fs'

export async function fsIsFile(fs: PromisifiedFS, path: string): Promise<boolean> {
  const stat = await fs.stat(path)

  return stat.isFile()
}
