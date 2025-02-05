import { tokenDb } from '@/features/token/data-access/token-db.ts'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useTokenMintDetail(mintId: string) {
  return useQuery({
    queryKey: ['tokenMintList'],
    queryFn: () => {
      return tokenDb.mints.get(mintId)
    },
  })
}

export function useTokenMintImport() {
  return useMutation({
    mutationFn: (input: { address: string; decimals: number; programId: string }) => {
      return tokenDb.mints.add({ ...input, id: input.address, secretKey: [] })
    },
  })
}
