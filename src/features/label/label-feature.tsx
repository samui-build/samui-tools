import { LucideTags } from 'lucide-react'
import { UiPageWithRoutes, UiPageWithRoutesProps } from '../../ui'
import { useLabelGroupCreate } from './data-access'
import { LabelFeatureGroupList } from './label-feature-group-list.tsx'
import { LabelUiButtonAddGroup } from './ui'

export default function LabelFeature() {
  const mutationCreate = useLabelGroupCreate()
  const page: UiPageWithRoutesProps = {
    title: 'Labels',
    icon: <LucideTags size={24} />,
    action: <LabelUiButtonAddGroup create={mutationCreate.mutateAsync} />,
    routes: [{ path: '', element: <LabelFeatureGroupList /> }],
  }
  return <UiPageWithRoutes {...page} />
}
