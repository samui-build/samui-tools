import { useTokenMintList } from '@/features/token/data-access/use-token-mint-list.ts'
import { TokenUiMintTable } from '@/features/token/ui/token-ui-mint-table.tsx'
import { UiPageHeader } from '@/ui'
import { Button, Group, Loader, Stack } from '@mantine/core'
import { LucideList } from 'lucide-react'
import { Link } from 'react-router'

export function TokenFeatureMintList() {
  const query = useTokenMintList()

  return (
    <Stack>
      <UiPageHeader
        title="Token Mints"
        icon={<LucideList size={24} />}
        action={
          <Group>
            <Button size="xs" variant="light" component={Link} to={'/tokens/import'}>
              Import Mint
            </Button>
            <TokenUiButtonAddMint />
          </Group>
        }
      />
      {query.isLoading ? (
        <Loader />
      ) : query.data?.length ? (
        <TokenUiMintTable
          data={query.data ?? []}
          delete={async () => {
            console.log('foo')
          }}
        />
      ) : (
        <div>No mints found</div>
      )}
    </Stack>
  )
}

function TokenUiButtonAddMint() {
  return (
    <Button
      size="xs"
      variant="light"
      onClick={async () => {
        // TODO: Add Mint
      }}
    >
      Create Mint
    </Button>
  )
}
