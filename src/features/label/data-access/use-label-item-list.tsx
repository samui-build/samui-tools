import { useQuery } from '@tanstack/react-query'
import { labelDb, LabelGroup } from './label-db.ts'

export function useLabelItemList(group: LabelGroup) {
  return useQuery({
    queryKey: ['labelItemList', { group }],
    queryFn: async () => labelDb.labels.where({ groupId: group.id }).sortBy('label'),
  })
}
