import { useFsFilesGet } from '@/features/files/data-access/use-fs-files-get.tsx'
import { fsAssertIsDirectory, fsFileExists } from '@/features/files/utils'
import { PromisifiedFS } from '@isomorphic-git/lightning-fs'
import { useMutation } from '@tanstack/react-query'

export function useFsDirectoryCreate(fs: PromisifiedFS, cwd: string) {
  const files = useFsFilesGet(fs, cwd)
  return useMutation({
    mutationFn: async (name: string) => {
      // Ensure the working directory exists and is a directory
      await fsAssertIsDirectory(fs, cwd)

      // Make sure the directory doesn't already exist
      const targetPath = `${cwd}/${name}`
      if (await fsFileExists(fs, targetPath)) {
        throw `Directory already exists: ${targetPath}`
      }

      // Create the directory
      try {
        await fs.mkdir(cwd + '/' + name)
        await files.refetch()
        return true
      } catch (error) {
        console.log('error', error)
        throw `Error: ${error}`
      }
    },
  })
}
