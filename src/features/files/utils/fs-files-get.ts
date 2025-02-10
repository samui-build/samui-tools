import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { fsAssertFileExists } from './fs-assert-file-exists.ts'
import { fsAssertIsDirectory } from './fs-assert-is-directory.ts'
import { fsFileDirectory, FsFileEntry } from './fs-file.ts'

export async function fsFilesGet(fs: PromisifiedFS, cwd: string): Promise<FsFileEntry[]> {
  // Ensure the working directory exists
  await fsAssertFileExists(fs, cwd)
  // Ensure the working directory is a directory
  await fsAssertIsDirectory(fs, cwd)
  const stat = await fs.stat(cwd)
  if (!stat.isDirectory()) {
    throw `Not a directory: ${cwd}`
  }
  try {
    const entries = await fs.readdir(cwd)

    return Promise.all(
      entries.map(async (entry) => {
        const entryPath = `${cwd !== '/' ? cwd : ''}/${entry}`
        const stat = await fs.stat(entryPath)

        if (stat.isDirectory()) {
          return fsFileDirectory({ name: entry, path: entryPath, stat })
        }

        return {
          name: entry,
          path: entryPath,
          stat,
          type: stat.isDirectory() ? 'directory' : 'file',
        }
      }),
    )
  } catch (error) {
    console.log('error', error)
    throw `Error reading dir: ${error}`
  }
}
