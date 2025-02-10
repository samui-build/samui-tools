import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { fsAssertFileExists } from './fs-assert-file-exists.ts'
import { fsAssertIsFile } from './fs-assert-is-file.ts'
import { FsFileEntry } from './fs-file.ts'

export async function fsFileGet(fs: PromisifiedFS, path: string): Promise<FsFileEntry> {
  // Ensure the file exists
  await fsAssertFileExists(fs, path)
  // Ensure the working directory is a directory
  await fsAssertIsFile(fs, path)

  // Get the file name from the path
  const entry = path.split('/').pop()

  if (!entry) {
    throw `Invalid path: ${path}`
  }

  try {
    // const content = await fs.readFile(path)

    const entryPath = `${path}`
    const stat = await fs.stat(entryPath)
    return {
      name: entry,
      path: entryPath,
      stat,
      type: stat.isDirectory() ? 'directory' : 'file',
    }
  } catch (error) {
    console.log('error', error)
    throw `Error reading dir: ${error}`
  }
}
