import { useTokenMintDetail } from '@/features/token/data-access/use-token-mint-detail.ts'
import { TokenFeatureMintDetailLoaded } from '@/features/token/token-feature-mint-detail-loaded.tsx'
import { UiPageHeader } from '@/ui'
import { ActionIcon, Loader, Stack } from '@mantine/core'
import { Connection, Keypair as SolanaKeypair } from '@solana/web3.js'
import { LucideArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'

export function TokenFeatureMintDetail({ feePayer, connection }: { feePayer: SolanaKeypair; connection: Connection }) {
  const { mintId } = useParams() as { mintId: string }
  const query = useTokenMintDetail(mintId)

  return (
    <Stack>
      <UiPageHeader
        title={`Token Mint ${mintId}`}
        icon={
          <ActionIcon component={Link} to={'/tokens'} size="sm">
            <LucideArrowLeft size={20} />
          </ActionIcon>
        }
      />
      {query.isLoading ? (
        <Loader />
      ) : query.data?.id ? (
        <TokenFeatureMintDetailLoaded tokenMint={query.data} feePayer={feePayer} connection={connection} />
      ) : (
        <div>Mint not found</div>
      )}
    </Stack>
  )
}
