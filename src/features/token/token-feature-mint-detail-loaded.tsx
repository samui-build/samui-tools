import { TokenMint } from '@/features/token/data-access/token-db.ts'
import { TokenFeatureMintCreate } from '@/features/token/token-feature-mint-create.tsx'
import { SplTokenGetMintWithMetadataResult } from '@/lib/spl-token'
import { useQuerySplTokenGetMint } from '@/lib/spl-token-react/use-query-spl-token-get-mint.ts'
import { Loader, Stack, Text } from '@mantine/core'
import { Connection, Keypair as SolanaKeypair, PublicKey } from '@solana/web3.js'

export function TokenFeatureMintDetailLoaded({
  feePayer,
  connection,
  tokenMint,
}: {
  feePayer: SolanaKeypair
  connection: Connection
  tokenMint: TokenMint
}) {
  const query = useQuerySplTokenGetMint({
    connection,
    mint: new PublicKey(tokenMint.address),
    programId: new PublicKey(tokenMint.programId),
  })

  return (
    <Stack>
      {query.isLoading ? (
        <Loader />
      ) : query.data ? (
        <MintOverview
          tokenMetadata={query.data.tokenMetadata}
          mplMetadata={query.data.mplMetadata}
          mint={query.data.mint}
        />
      ) : (
        <Stack align="start">
          <Text>Mint not found</Text>
          <TokenFeatureMintCreate feePayer={feePayer} connection={connection} tokenMint={tokenMint} />
        </Stack>
      )}
    </Stack>
  )
}

function MintOverview({ mplMetadata, tokenMetadata, mint }: SplTokenGetMintWithMetadataResult) {
  return (
    <Stack>
      {!mplMetadata ? <div>No JSON</div> : null}
      {!tokenMetadata ? <div>No Metadata</div> : null}
      {!mint ? <div>No Mint</div> : null}
      <Text>Mint Overview</Text>
      <pre>{JSON.stringify({ mplMetadata: mplMetadata, tokenMetadata: tokenMetadata, mint }, null, 2)}</pre>
    </Stack>
  )
}
