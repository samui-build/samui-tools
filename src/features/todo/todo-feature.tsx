import { LucideListChecks } from 'lucide-react'
import { UiPageWithRoutes, UiPageWithRoutesProps } from '../../ui'
import { useTodoListCreate } from './data-access'
import { TodoFeatureLists } from './todo-feature-lists.tsx'
import { TodoUiAddTodoList } from './ui'

export default function TodoFeature() {
  const mutationCreate = useTodoListCreate()

  const page: UiPageWithRoutesProps = {
    title: 'Todo',
    icon: <LucideListChecks size={24} />,
    action: <TodoUiAddTodoList create={mutationCreate.mutateAsync} />,
    routes: [
      {
        path: '',
        element: <TodoFeatureLists />,
      },
    ],
  }

  return <UiPageWithRoutes {...page} />
}
