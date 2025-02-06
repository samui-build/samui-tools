import { useGetAccount } from '@/features/account/data-access'
import { AccountUiModalButtons } from '@/features/account/ui/account-ui-modal-buttons.tsx'
import { AccountUiOverview } from '@/features/account/ui/account-ui-overview.tsx'
import { UiCard, UiTabRoutes } from '@/ui'
import { Container, Stack } from '@mantine/core'
import { AccountFeatureDetailTokens } from './account-feature-detail-tokens.tsx'
import { AccountFeatureDetailTransactions } from './account-feature-detail-transactions.tsx'

export function AccountFeatureDetailPage({ address }: { address: string }) {
  const query = useGetAccount({ address })

  return (
    <Container>
      <Stack>
        <UiCard
          title="Account Details"
          description={address}
          isLoading={query.isLoading}
          error={query.error}
          action={<AccountUiModalButtons size="xs" variant="light" address={address} />}
        >
          <AccountUiOverview address={address} account={query.data?.value ?? null} />
        </UiCard>
        <UiTabRoutes
          basePath={`/account/${address}`}
          tabs={[
            {
              label: 'Transactions',
              path: 'transactions',
              element: <AccountFeatureDetailTransactions address={address} />,
            },
            { label: 'Tokens', path: 'tokens', element: <AccountFeatureDetailTokens address={address} /> },
          ]}
        />
      </Stack>
    </Container>
  )
}
