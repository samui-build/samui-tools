import { useQuery } from '@tanstack/react-query'
import { todoDb } from './todo-db.ts'

export function useTodoLists() {
  return useQuery({
    queryKey: ['todoLists'],
    queryFn: async () => todoDb.todoLists.toArray(),
  })
}