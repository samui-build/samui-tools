import { useQuery } from '@tanstack/react-query'
import { todoDb, TodoList } from './todo-db.ts'

export function useTodoItems(todoList: TodoList) {
  return useQuery({
    queryKey: ['todoItems', { todoListId: todoList.id }],
    queryFn: async () => todoDb.todoItems.where({ todoListId: todoList.id }).toArray(),
  })
}