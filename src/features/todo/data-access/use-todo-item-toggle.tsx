import { useMutation } from '@tanstack/react-query'
import { todoDb, TodoItem, TodoList } from './todo-db.ts'

import { useTodoItems } from './use-todo-items.tsx'

export function useTodoItemToggle(todoList: TodoList) {
  const items = useTodoItems(todoList)

  return useMutation({
    mutationFn: async (todoIdem: TodoItem) => {
      if (!todoIdem.id) {
        throw new Error('No id found')
      }
      await todoDb.todoItems.update(todoIdem.id, { done: !todoIdem.done })
      await items.refetch()
    },
  })
}
