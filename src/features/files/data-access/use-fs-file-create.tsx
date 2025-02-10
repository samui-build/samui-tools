import { fsAssertIsDirectory, fsFileExists } from '@/features/files/utils'
import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { useMutation } from '@tanstack/react-query'
import { useFsFilesGet } from './use-fs-files-get'

export function useFsFileCreate(fs: PromisifiedFS, cwd: string) {
  const files = useFsFilesGet(fs, cwd)
  return useMutation({
    mutationFn: async ({ name, data }: { name: string; data: Uint8Array | string }) => {
      // Ensure the working directory exists and is a directory
      await fsAssertIsDirectory(fs, cwd)

      // Make sure the directory doesn't already exist
      const targetPath = `${cwd}/${name}`
      if (await fsFileExists(fs, targetPath)) {
        throw `File already exists: ${targetPath}`
      }

      // Create the file
      try {
        await fs.writeFile(cwd + '/' + name, data)
        await files.refetch()
        return true
      } catch (error) {
        console.log('error', error)
        throw `Error: ${error}`
      }
    },
  })
}
