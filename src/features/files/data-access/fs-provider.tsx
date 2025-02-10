import { fsFileGetEntry } from '@/features/files/utils/fs-file-get-entry.ts'
import { Alert } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { FsContext } from './fs-context.ts'
import { fsDefault } from './fs-default.ts'
import { useInitializeFs } from './use-initialize-fs.tsx'

export function FsProvider({
  children,
  basePath,
  path = '/',
}: {
  children: ReactNode
  basePath: string
  path?: string
}) {
  const query = useInitializeFs(fsDefault)
  const queryFileGetEntry = useQuery({
    queryKey: ['fsFileGetEntry', path],
    queryFn: async () => {
      console.log('FsProvider', path)
      if (!query.data) {
        return null
      }
      const entry = await fsFileGetEntry(query.data, path)
      console.log('FsProvider', entry)
      return entry
    },
    retry: 0,
    enabled: query.data !== undefined,
  })

  if (query.isLoading || queryFileGetEntry.isLoading) {
    return null
  }

  if (query.isError) {
    return (
      <Alert title="Error loading filesystem" color="red">
        {query.error?.message}
      </Alert>
    )
  }

  if (!query.data) {
    return (
      <Alert title="Error loading filesystem" color="red">
        Filesystem not found
      </Alert>
    )
  }

  const value = {
    basePath,
    path,
    pathEntry: queryFileGetEntry.data ?? undefined,
    fs: query.data,
  }

  return <FsContext.Provider value={value}>{children}</FsContext.Provider>
}
