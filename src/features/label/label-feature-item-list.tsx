import { UiCard } from '@/ui'
import { Alert, Loader } from '@mantine/core'
import { LabelGroup, useLabelCreate, useLabelDelete, useLabelItemList, useLabelUpdate } from './data-access'
import { LabelUiButtonAddLabel, LabelUiTableItems } from './ui'

export function LabelFeatureItemList({ group }: { group: LabelGroup }) {
  const queryItems = useLabelItemList(group)
  const mutationDelete = useLabelDelete(group)
  const mutationUpdate = useLabelUpdate(group)
  const mutationCreate = useLabelCreate(group)

  return (
    <UiCard action={<LabelUiButtonAddLabel create={mutationCreate.mutateAsync} />}>
      {queryItems.isLoading ? (
        <Loader />
      ) : queryItems.data?.length ? (
        <LabelUiTableItems
          data={queryItems.data ?? []}
          delete={mutationDelete.mutateAsync}
          update={mutationUpdate.mutateAsync}
        />
      ) : (
        <Alert color="blue" title="No labels found in this group" />
      )}
    </UiCard>
  )
}
