import { Alert, Button, Group, Loader, Stack, Text } from '@mantine/core'
import {
  TodoList,
  useTodoItemCreate,
  useTodoItemDelete,
  useTodoItems,
  useTodoItemToggle,
  useTodoListDelete,
} from './data-access'
import { TodoUiCreateForm, TodoUiTodoItems } from './ui'

export function TodoFeatureDetail({ list }: { list: TodoList }) {
  const mutationDeleteList = useTodoListDelete()
  const mutationCreateItem = useTodoItemCreate(list)
  const mutationDeleteItem = useTodoItemDelete(list)
  const mutationToggleItem = useTodoItemToggle(list)
  const queryItems = useTodoItems(list)

  return (
    <Stack>
      <TodoUiCreateForm todoList={list} createItem={mutationCreateItem.mutateAsync} />
      {queryItems.isLoading ? (
        <Loader />
      ) : queryItems.data?.length ? (
        <TodoUiTodoItems
          deleteItem={mutationDeleteItem.mutateAsync}
          items={queryItems.data ?? []}
          toggleItem={mutationToggleItem.mutateAsync}
        />
      ) : (
        <Alert
          styles={{ label: { width: '100%' } }}
          color="blue"
          title={
            <Group justify="space-between" align="center" wrap="nowrap">
              <Text size="lg">No items found</Text>
              <Button
                variant="outline"
                color="blue"
                size="xs"
                onClick={async () => {
                  if (!window.confirm('Are you sure?')) {
                    return
                  }
                  await mutationDeleteList.mutateAsync(list)
                }}
              >
                Delete List
              </Button>
            </Group>
          }
        />
      )}
    </Stack>
  )
}
