import { useMutation, useQuery } from '@tanstack/react-query'
import { todoDb, TodoItem, TodoList } from './todo-db.ts'

export function useTodoLists() {
  return useQuery({
    queryKey: ['todoLists'],
    queryFn: async () => todoDb.todoLists.toArray(),
  })
}

export function useTodoItems(todoList: TodoList) {
  return useQuery({
    queryKey: ['todoItems', { todoListId: todoList.id }],
    queryFn: async () => todoDb.todoItems.where({ todoListId: todoList.id }).toArray(),
  })
}

export function useTodoListCreate() {
  const lists = useTodoLists()
  return useMutation({
    mutationFn: async (todoList: TodoList) => {
      await todoDb.todoLists.add(todoList)
      await lists.refetch()
    },
  })
}

export function useTodoListDelete() {
  const lists = useTodoLists()
  return useMutation({
    mutationFn: async (todoList: TodoList) => {
      if (!todoList.id) {
        throw new Error('No id found')
      }
      await todoDb.todoLists.delete(todoList.id)
      await lists.refetch()
    },
  })
}

export function useTodoItemCreate(todoList: TodoList) {
  const items = useTodoItems(todoList)

  return useMutation({
    mutationFn: async (todoIdem: TodoItem) => {
      await todoDb.todoItems.add(todoIdem)
      await items.refetch()
    },
  })
}

export function useTodoItemDelete(todoList: TodoList) {
  const items = useTodoItems(todoList)

  return useMutation({
    mutationFn: async (todoIdem: TodoItem) => {
      if (!todoIdem.id) {
        throw new Error('No id found')
      }
      await todoDb.todoItems.delete(todoIdem.id)
      await items.refetch()
    },
  })
}

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
