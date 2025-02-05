import { useMutation } from '@tanstack/react-query'
import { labelDb, LabelGroup } from './label-db.ts'
import { useLabelGroupList } from './use-label-group-list.tsx'

export type LabelGroupCreateInput = Omit<LabelGroup, 'id'>

export function useLabelGroupCreate() {
  const groups = useLabelGroupList()
  return useMutation({
    mutationFn: async (label: LabelGroupCreateInput) => {
      await labelDb.groups.add({ ...label, id: crypto.randomUUID() })
      await groups.refetch()
    },
  })
}
