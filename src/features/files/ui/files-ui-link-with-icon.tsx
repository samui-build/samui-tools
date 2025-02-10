import { FsFileEntry } from '@/features/files/utils'
import { AnchorProps, Group } from '@mantine/core'
import { LucideFile, LucideFolder } from 'lucide-react'
import { FilesUiLink } from './files-ui-link.tsx'

export function FilesUiLinkWithIcon({ file, ...pros }: AnchorProps & { file: FsFileEntry }) {
  return (
    <FilesUiLink file={file} {...pros}>
      <Group gap="xs" wrap="nowrap">
        {file.type === 'directory' ? <LucideFolder size={16} /> : <LucideFile size={16} />}
        <span style={{ whiteSpace: 'nowrap' }}>{file.name}</span>
      </Group>
    </FilesUiLink>
  )
}
