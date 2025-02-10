import { FilesUiBreadcrumb } from '@/features/files/ui/files-ui-breadcrumb.tsx'
import { Text } from '@mantine/core'
import { Fragment } from 'react'

export function FilesUiBreadcrumbs({ path, label }: { path: string; label: string }) {
  const parts = path.split('/').filter(Boolean) // Split by '/' and remove empty parts
  let accumulatedPath = ''

  const crumbs = parts.map((part, index) => {
    accumulatedPath += `/${part}` // Build path step by step
    const isLast = index === parts.length - 1

    return (
      <Fragment key={accumulatedPath}>
        {!isLast ? (
          <FilesUiBreadcrumb path={accumulatedPath} label={part} />
        ) : (
          // <Anchor fz="inherit" component={Link} to={{ search: `?path=${accumulatedPath}` }} display="inline-block">
          //   {part}
          // </Anchor>
          <Text span fz="inherit">
            {part}
          </Text> // Last part is not a link
        )}
        {index < parts.length - 1 && ' / '}
      </Fragment>
    )
  })

  return (
    <Fragment>
      <FilesUiBreadcrumb path="/" label={label} />
      {path === '/' ? ' ' : ' / '}
      {crumbs}
    </Fragment>
  )
}
