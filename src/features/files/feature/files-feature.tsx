import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { FsProvider } from '../data-access'
import { FilesFeaturePage } from './files-feature-page.tsx'

export default function FilesFeature() {
  const [searchParams, setSearchParams] = useSearchParams()
  const basePath = '/files'
  const path = searchParams.get('path')

  useEffect(() => {
    if (!path) {
      setSearchParams({ path: '/' })
    }
  }, [path, setSearchParams])

  return (
    <FsProvider basePath={basePath} path={path ?? undefined}>
      <FilesFeaturePage />
    </FsProvider>
  )
}
