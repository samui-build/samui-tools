import { Button } from '@mantine/core'
import { LucideListPlus } from 'lucide-react'
import { useTodoListCreate } from '../data-access/todo-list-provider.tsx'

export function TodoUiAddTodoList() {
  const mutationCreate = useTodoListCreate()
  return (
    <Button
      leftSection={<LucideListPlus size={16} />}
      variant="light"
      size="sm"
      onClick={async () => {
        const title = window.prompt('Enter list name', '')
        if (!title?.trim()?.length) {
          return
        }
        await mutationCreate.mutateAsync({ title })
      }}
    >
      Add Todo List
    </Button>
  )
}
