import { ActionIcon, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { LucideCheck } from 'lucide-react'
import { TodoItem, TodoList } from '../data-access/todo-db.ts'

export function TodoUiCreateForm({
  todoList,
  createItem,
}: {
  createItem: (todo: TodoItem) => Promise<void>
  todoList: TodoList
}) {
  const form = useForm<TodoItem>({
    initialValues: {
      done: false,
      title: '',
      todoListId: todoList.id ?? 0,
    },
    validate: {
      title: (value) => (value.length === 0 ? 'Please provide a title' : null),
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        createItem(values).then(() => form.reset())
      })}
    >
      <TextInput
        type="text"
        size="lg"
        placeholder="Write a todo"
        key={form.key('title')}
        autoFocus
        required
        disabled={!form.isValid || !form.isDirty}
        rightSection={
          <ActionIcon type="submit" size="lg">
            <LucideCheck size={24} />
          </ActionIcon>
        }
        {...form.getInputProps('title')}
      />
    </form>
  )
}
