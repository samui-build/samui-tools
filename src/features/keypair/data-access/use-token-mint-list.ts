import { useQuery } from '@tanstack/react-query'
import { keypairDb } from './keypair-db.ts'

export function useKeypairList() {
  return useQuery({
    queryKey: ['keypairList'],
    queryFn: () => {
      return keypairDb.keypairs.toArray()
    },
  })
}
