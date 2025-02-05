import { useMutation } from '@tanstack/react-query'
import { labelDb, LabelGroup, LabelItem } from './label-db.ts'
import { useLabelItemList } from './use-label-item-list.tsx'

export function useLabelUpdate(group: LabelGroup) {
  const lists = useLabelItemList(group)
  return useMutation({
    mutationFn: async (label: LabelItem) => {
      if (!label.id) {
        throw new Error('No id found')
      }
      await labelDb.labels.update(label.id, label)
      await lists.refetch()
    },
  })
}
