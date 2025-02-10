import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { fsAssertFileExists } from './fs-assert-file-exists.ts'
import { FsFileEntry } from './fs-file.ts'

export async function fsFileGetEntry(fs: PromisifiedFS, path: string): Promise<FsFileEntry> {
  // Ensure the file exists
  await fsAssertFileExists(fs, path)

  // Get the file name from the path
  const entry = path !== '/' ? path.split('/').pop() : path

  try {
    const entryPath = `${path}`
    const stat = await fs.stat(entryPath)

    return {
      name: entry ?? path,
      path: entryPath,
      stat,
      type: stat.isDirectory() ? 'directory' : 'file',
    }
  } catch (error) {
    console.log('error', error)
    throw `fsFileGetEntry: Error reading dir: ${error}`
  }
}
