import { useMutation } from '@tanstack/react-query'
import { todoDb, TodoList } from './todo-db.ts'
import { useTodoLists } from './use-todo-lists.tsx'

export function useTodoListUpdate() {
  const lists = useTodoLists()
  return useMutation({
    mutationFn: async (todoList: TodoList) => {
      if (!todoList.id) {
        throw new Error('No id found')
      }
      await todoDb.todoLists.update(todoList.id, todoList)
      await lists.refetch()
    },
  })
}
