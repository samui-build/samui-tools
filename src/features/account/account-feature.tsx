import { UiPageWithRoutes } from '@/ui'
import { ActionIcon, TextInput } from '@mantine/core'
import { LucideSearch, LucideWallet } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { AccountFeatureDetail } from './account-feature-detail.tsx'
import { AccountFeatureList } from './account-feature-list.tsx'

export default function AccountFeature() {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  return (
    <UiPageWithRoutes
      title="Account"
      icon={<LucideWallet size={24} />}
      action={
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!address?.length) {
              return
            }
            setAddress('')
            navigate(`/account/${address}`)
          }}
        >
          <TextInput
            autoCapitalize="off"
            autoCorrect="off"
            size="xs"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Search account"
            rightSection={
              <ActionIcon type="submit" variant="light" size="xs">
                <LucideSearch size={16} />
              </ActionIcon>
            }
          />
        </form>
      }
      routes={[
        { path: '', element: <AccountFeatureList /> },
        { path: ':address/*', element: <AccountFeatureDetail /> },
      ]}
    />
  )
}
