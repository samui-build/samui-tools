import { PromisifiedFS } from '@isomorphic-git/lightning-fs'

export async function fsDirectoryDelete(fs: PromisifiedFS, path: string, options: { recursive: boolean }) {
  if (!options.recursive) {
    return await fs.rmdir(path)
  }
  for (const item of await fs.readdir(path)) {
    const item_path = `${path}/` + item
    if ((await fs.stat(item_path)).type === 'file') {
      await fs.unlink(item_path)
    } else {
      await fsDirectoryDelete(fs, item_path, { recursive: true })
      await fs.rmdir(item_path)
    }
  }
  return await fs.rmdir(path)
}
