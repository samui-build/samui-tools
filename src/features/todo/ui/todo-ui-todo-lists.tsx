import { Accordion } from '@mantine/core'
import { LucideListCheck } from 'lucide-react'
import { ReactNode } from 'react'
import { TodoList } from '../data-access'

export function TodoUiTodoLists({
  todoLists,
  render,
}: {
  todoLists: TodoList[]
  render: (todoList: TodoList) => ReactNode
}) {
  return (
    <Accordion variant="separated" multiple>
      {todoLists.map((todoList) => (
        <Accordion.Item value={`${todoList.id?.toString()}`} key={todoList.id}>
          <Accordion.Control icon={<LucideListCheck size={20} />}>{todoList.title}</Accordion.Control>
          <Accordion.Panel>{render(todoList)}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
