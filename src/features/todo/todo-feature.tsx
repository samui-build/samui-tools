import { LucideListChecks } from 'lucide-react'
import { useRoutes } from 'react-router'
import { UiPage } from '../../ui'
import { TodoFeatureLists } from './todo-feature-lists.tsx'
import { TodoUiAddTodoList } from './ui/todo-ui-add-todo-list.tsx'

export default function TodoFeature() {
  return useRoutes([
    {
      path: '',
      element: <UiPage title="Todo" icon={<LucideListChecks size={24} />} action={<TodoUiAddTodoList />} />,
      children: [{ index: true, element: <TodoFeatureLists /> }],
    },
  ])
}
