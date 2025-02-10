import { FsFileEntry } from '@/features/files/utils'
import { Anchor, AnchorProps } from '@mantine/core'
import { ReactNode } from 'react'
import { Link } from 'react-router'

export function FilesUiLink({ children, file, ...pros }: AnchorProps & { children?: ReactNode; file: FsFileEntry }) {
  return (
    <Anchor fz="inherit" component={Link} to={{ search: `?path=${file.path}` }} display="flex" {...pros}>
      {children ? children : <span>{file.name}</span>}
    </Anchor>
  )
}
