import { ActionIcon, Alert, Group, Switch, Text } from '@mantine/core'
import { LucideTrash } from 'lucide-react'
import { TodoItem } from '../data-access'

export function TodoUiTodoItem({
  deleteTodo,
  todoItem,
  toggleTodo,
}: {
  deleteTodo: (todo: TodoItem) => Promise<void>
  todoItem: TodoItem
  toggleTodo: (todo: TodoItem) => Promise<void>
}) {
  return (
    <Alert
      variant="default"
      key={todoItem.id}
      styles={{ label: { width: '100%' } }}
      title={
        <Group justify="space-between" align="center" wrap="nowrap">
          <Text
            style={{ cursor: 'pointer' }}
            td={todoItem.done ? 'line-through' : 'none'}
            onClick={() => toggleTodo(todoItem)}
          >
            {todoItem.title}
          </Text>
          <Group>
            <Switch checked={todoItem.done} onChange={() => toggleTodo(todoItem)} />
            <ActionIcon onClick={() => deleteTodo(todoItem)} variant="light" size="md">
              <LucideTrash size={16} />
            </ActionIcon>
          </Group>
        </Group>
      }
    />
  )
}
