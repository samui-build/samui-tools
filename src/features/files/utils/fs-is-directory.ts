import { PromisifiedFS } from '@isomorphic-git/lightning-fs'

export async function fsIsDirectory(fs: PromisifiedFS, path: string): Promise<boolean> {
  const stat = await fs.stat(path)

  return stat.isDirectory()
}
