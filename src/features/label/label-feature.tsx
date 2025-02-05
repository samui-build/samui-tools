import { UiPageWithRoutes } from '@/ui'
import { LucideTags } from 'lucide-react'
import { useLabelGroupCreate } from './data-access'
import { LabelFeatureGroupList } from './label-feature-group-list.tsx'
import { LabelUiButtonAddGroup } from './ui'

export default function LabelFeature() {
  const mutationCreate = useLabelGroupCreate()
  return (
    <UiPageWithRoutes
      title="Labels"
      icon={<LucideTags size={24} />}
      action={<LabelUiButtonAddGroup create={mutationCreate.mutateAsync} />}
      routes={[{ path: '', element: <LabelFeatureGroupList /> }]}
    />
  )
}
