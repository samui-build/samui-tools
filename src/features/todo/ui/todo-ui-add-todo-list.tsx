import { Button } from '@mantine/core'
import { LucideListPlus } from 'lucide-react'
import { TodoList } from '../data-access'

export function TodoUiAddTodoList({ create }: { create: (input: TodoList) => Promise<void> }) {
  return (
    <Button
      leftSection={<LucideListPlus size={16} />}
      variant="light"
      size="xs"
      onClick={async () => {
        const title = window.prompt('Enter list name', '')
        if (!title?.trim()?.length) {
          return
        }
        await create({ title })
      }}
    >
      Add Todo List
    </Button>
  )
}
