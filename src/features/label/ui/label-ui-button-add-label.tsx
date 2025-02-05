import { Button } from '@mantine/core'
import { LucideTag } from 'lucide-react'
import { LabelCreateInput } from '../data-access'

export function LabelUiButtonAddLabel({ create }: { create: (label: LabelCreateInput) => Promise<void> }) {
  return (
    <Button
      leftSection={<LucideTag size={16} />}
      variant="light"
      size="xs"
      onClick={async () => {
        const address = window.prompt('Enter address', '')
        if (!address?.trim()?.length) {
          return
        }
        const label = window.prompt('Enter label', '')
        if (!label?.trim()?.length) {
          return
        }
        await create({ address, label })
      }}
    >
      Add Label
    </Button>
  )
}
