import { Alert, Flex, Loader } from '@mantine/core'
import { useLabelGroupList } from './data-access'
import { LabelFeatureItemList } from './label-feature-item-list.tsx'
import { LabelUiGroupList } from './ui'

export function LabelFeatureGroupList() {
  const query = useLabelGroupList()

  return (
    <Flex direction="column" gap="md">
      {query.isLoading ? (
        <Loader />
      ) : query.data?.length ? (
        <LabelUiGroupList
          groups={query.data ?? []}
          render={(group) => {
            return <LabelFeatureItemList group={group} />
          }}
        />
      ) : (
        <Alert color="blue" title="No label lists found" />
      )}
    </Flex>
  )
}
