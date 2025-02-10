import { useFs, useFsDirectoryCreate, useFsFileCreate } from '@/features/files/data-access'
import { FilesUiActions } from '@/features/files/ui'
import { LucideFilePlus, LucideFolderPlus } from 'lucide-react'

export function FilesFeatureActionsDirectory({ path }: { path: string }) {
  const { fs } = useFs()
  const mutationCreateDirectory = useFsDirectoryCreate(fs, path)
  const mutationCreateFile = useFsFileCreate(fs, path)

  return (
    <FilesUiActions
      actions={[
        {
          name: 'Add Folder',
          type: 'button',
          icon: LucideFolderPlus,
          handler: async () => {
            const name = prompt('Enter directory name', '')
            if (!name?.trim()?.length) {
              return
            }
            await mutationCreateDirectory.mutateAsync(name)
          },
        },
        {
          name: 'Add File',
          type: 'button',
          icon: LucideFilePlus,
          handler: async () => {
            const name = prompt('Enter file name', '')
            if (!name?.trim()?.length) {
              return
            }
            const content = prompt('Enter file content', 'Hello World!')
            if (!content?.trim()?.length) {
              return
            }
            await mutationCreateFile.mutateAsync({ name, data: content })
          },
        },
      ]}
    />
  )
}

export function FilesFeatureActionsFile(props: { path: string }) {
  console.log('FilesFeatureActionsFile', props)

  return <FilesUiActions actions={[]} />
}
