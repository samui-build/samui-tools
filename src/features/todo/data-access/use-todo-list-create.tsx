import { useMutation } from '@tanstack/react-query'
import { todoDb, TodoList } from './todo-db.ts'

import { useTodoLists } from './use-todo-lists.tsx'

export function useTodoListCreate() {
  const lists = useTodoLists()
  return useMutation({
    mutationFn: async (todoList: TodoList) => {
      await todoDb.todoLists.add(todoList)
      await lists.refetch()
    },
  })
}
