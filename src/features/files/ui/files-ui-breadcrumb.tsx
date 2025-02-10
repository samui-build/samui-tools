import { Anchor } from '@mantine/core'
import { Link } from 'react-router'

export function FilesUiBreadcrumb({ path, label }: { path: string; label: string }) {
  return (
    <Anchor fz="inherit" component={Link} to={{ search: `?path=${path}` }} display="inline-block">
      {label}
    </Anchor>
  )
}