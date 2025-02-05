import { Alert, Flex, Loader } from '@mantine/core'
import { useTodoLists } from './data-access/todo-list-provider.tsx'
import { TodoFeatureDetail } from './todo-feature-detail.tsx'

import { TodoUiTodoLists } from './ui/todo-ui-todo-lists.tsx'

export function TodoFeatureLists() {
  const queryLists = useTodoLists()
  const lists = queryLists.data ?? []

  return (
    <Flex direction="column" gap="md">
      {queryLists.isLoading ? (
        <Loader />
      ) : lists.length ? (
        <TodoUiTodoLists todoLists={lists} render={(todoList) => <TodoFeatureDetail list={todoList} />} />
      ) : (
        <Alert color="blue" title="No todo lists found" />
      )}
    </Flex>
  )
}
