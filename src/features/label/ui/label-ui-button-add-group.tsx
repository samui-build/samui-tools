import { Button } from '@mantine/core'
import { LucideTags } from 'lucide-react'
import { LabelGroupCreateInput } from '../data-access'

export function LabelUiButtonAddGroup({ create }: { create: (group: LabelGroupCreateInput) => Promise<void> }) {
  return (
    <Button
      leftSection={<LucideTags size={16} />}
      variant="light"
      size="xs"
      onClick={async () => {
        const name = window.prompt('Enter name', '')
        if (!name?.trim()?.length) {
          return
        }
        await create({ name })
      }}
    >
      Add Group
    </Button>
  )
}
