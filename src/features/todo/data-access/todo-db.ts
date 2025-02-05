import Dexie, { Table } from 'dexie'

export interface TodoItem {
  id?: number
  todoListId: number
  title: string
  done?: boolean
}

export interface TodoList {
  id?: number
  title: string
}

export async function populate() {
  const todoListId = await todoDb.todoLists.add({
    title: 'To Do Today',
  })
  await todoDb.todoItems.bulkAdd([
    {
      todoListId,
      title: 'Feed the birds',
    },
    {
      todoListId,
      title: 'Watch a movie',
    },
    {
      todoListId,
      title: 'Have some sleep',
    },
  ])
}

export class TodoDb extends Dexie {
  todoLists!: Table<TodoList, number>
  todoItems!: Table<TodoItem, number>

  constructor() {
    super('TodoDB')
    this.version(1).stores({
      todoLists: '++id',
      todoItems: '++id, todoListId',
    })
  }

  deleteList(todoListId: number) {
    return this.transaction('rw', this.todoItems, this.todoLists, () => {
      this.todoItems.where({ todoListId }).delete()
      this.todoLists.delete(todoListId)
    })
  }
}

export const todoDb = new TodoDb()

todoDb.on('populate', populate)

export function resetDatabase() {
  return todoDb.transaction('rw', todoDb.todoLists, todoDb.todoItems, async () => {
    await Promise.all(todoDb.tables.map((table) => table.clear()))
    await populate()
  })
}
