import { fsFileExists } from '@/features/files/utils/fs-file-exists.ts'
import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { fsAssertFileExists } from './fs-assert-file-exists.ts'
import { fsDirectoryDelete } from './fs-directory-delete.ts'

export async function fsFileDelete(fs: PromisifiedFS, path: string): Promise<boolean> {
  // Ensure the file exists
  await fsAssertFileExists(fs, path)

  try {
    const stat = await fs.stat(path)
    if (stat.isDirectory()) {
      await fsDirectoryDelete(fs, path, { recursive: true })
      return true
    }
    await fs.unlink(path)
    return true
  } catch (error) {
    console.log('error', error)
    throw `Error deleting file: ${error}`
  }
}

export async function fsFileRename(fs: PromisifiedFS, path: string, newPath: string): Promise<boolean> {
  // Ensure the file exists
  await fsAssertFileExists(fs, path)

  const newPathExists = await fsFileExists(fs, newPath)
  if (newPathExists) {
    throw `Cannot rename to existing file: ${newPath}`
  }

  try {
    await fs.rename(path, newPath)
    return true
  } catch (error) {
    console.log('error', error)
    throw `Error deleting file: ${error}`
  }
}
