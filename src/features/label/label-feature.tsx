import { LucideTags } from 'lucide-react'
import { useRoutes } from 'react-router'
import { UiPage } from '../../ui'
import { useLabelGroupCreate } from './data-access'
import { LabelFeatureGroupList } from './label-feature-group-list.tsx'
import { LabelUiButtonAddGroup } from './ui'

export default function LabelFeature() {
  const mutationCreate = useLabelGroupCreate()

  return useRoutes([
    {
      path: '',
      element: (
        <UiPage
          title="Labels"
          icon={<LucideTags size={24} />}
          action={<LabelUiButtonAddGroup create={mutationCreate.mutateAsync} />}
        />
      ),
      children: [{ index: true, element: <LabelFeatureGroupList /> }],
    },
  ])
}
