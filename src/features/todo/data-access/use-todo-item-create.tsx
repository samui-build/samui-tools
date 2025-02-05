import { useMutation } from '@tanstack/react-query'
import { todoDb, TodoItem, TodoList } from './todo-db.ts'

import { useTodoItems } from './use-todo-items.tsx'

export function useTodoItemCreate(todoList: TodoList) {
  const items = useTodoItems(todoList)

  return useMutation({
    mutationFn: async (todoIdem: TodoItem) => {
      await todoDb.todoItems.add(todoIdem)
      await items.refetch()
    },
  })
}
