import { useQuery } from '@tanstack/react-query'
import { labelDb } from './label-db.ts'

export function useLabelGroupList() {
  return useQuery({
    queryKey: ['labelGroupList'],
    queryFn: async () => labelDb.groups.toArray(),
  })
}
