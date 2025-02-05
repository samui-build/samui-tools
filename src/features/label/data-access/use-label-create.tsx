import { useMutation } from '@tanstack/react-query'
import { labelDb, LabelGroup, LabelItem } from './label-db.ts'
import { useLabelItemList } from './use-label-item-list.tsx'

export type LabelCreateInput = Omit<LabelItem, 'id' | 'groupId'>

export function useLabelCreate(group: LabelGroup) {
  const lists = useLabelItemList(group)
  return useMutation({
    mutationFn: async (label: LabelCreateInput) => {
      await labelDb.labels.add({ ...label, groupId: group.id, id: crypto.randomUUID() })
      await lists.refetch()
    },
  })
}
