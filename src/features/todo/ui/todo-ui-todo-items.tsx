import { Stack } from '@mantine/core'
import { TodoItem } from '../data-access'
import { TodoUiTodoItem } from './todo-ui-todo-item'

export function TodoUiTodoItems({
  deleteItem,
  items,
  toggleItem,
}: {
  deleteItem: (todo: TodoItem) => Promise<void>
  items: TodoItem[]
  toggleItem: (todo: TodoItem) => Promise<void>
}) {
  return (
    <Stack>
      {items.map((todoItem) => (
        <TodoUiTodoItem todoItem={todoItem} key={todoItem.id} deleteTodo={deleteItem} toggleTodo={toggleItem} />
      ))}
    </Stack>
  )
}
