import { tokenDb } from '@/features/token/data-access/token-db.ts'
import { useQuery } from '@tanstack/react-query'

export function useTokenMintList() {
  return useQuery({
    queryKey: ['tokenMintList'],
    queryFn: () => {
      return tokenDb.mints.toArray()
    },
  })
}
