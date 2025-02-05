import { Accordion } from '@mantine/core'
import { LucideTags } from 'lucide-react'
import { ReactNode } from 'react'
import { LabelGroup } from '../data-access'

export function LabelUiGroupList({
  groups,
  render,
}: {
  groups: LabelGroup[]
  render: (groups: LabelGroup) => ReactNode
}) {
  return (
    <Accordion variant="separated" multiple>
      {groups.map((group) => (
        <Accordion.Item value={`${group.id?.toString()}`} key={group.id}>
          <Accordion.Control icon={<LucideTags size={20} />}>{group.name}</Accordion.Control>
          <Accordion.Panel>{render(group)}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
