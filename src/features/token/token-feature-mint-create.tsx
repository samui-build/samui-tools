import { TokenMint } from '@/features/token/data-access/token-db.ts'
import { useMutationSplTokenCreateMint } from '@/lib/spl-token-react'
import { UiError } from '@/ui/ui-error.tsx'
import { Button, Stack } from '@mantine/core'
import { Connection, Keypair as SolanaKeypair, PublicKey } from '@solana/web3.js'

export function TokenFeatureMintCreate({
  feePayer,
  connection,
  tokenMint,
}: {
  feePayer: SolanaKeypair
  connection: Connection
  tokenMint: TokenMint
}) {
  const mutationCreateMint = useMutationSplTokenCreateMint({ connection })
  const mint = tokenMint.secretKey?.length
    ? SolanaKeypair.fromSecretKey(new Uint8Array(tokenMint.secretKey))
    : SolanaKeypair.generate()

  return (
    <Stack align="start">
      <UiError error={mutationCreateMint.error} />
      <Button
        loading={mutationCreateMint.isPending}
        onClick={async () => {
          await mutationCreateMint.mutateAsync({
            authority: feePayer.publicKey,
            feePayer,
            programId: new PublicKey(tokenMint.programId),
            mint,
            decimals: tokenMint.decimals,
            metadata: {
              name: 'Samui Test',
              symbol: 'SAMUI',
              uri: 'https://gist.githubusercontent.com/beeman/aabfa5c91100976b38339c4a3a1708fb/raw',
              additionalMetadata: [['foo', 'bar']],
            },
          })
        }}
      >
        Create Mint
      </Button>
      {mutationCreateMint.data ? <pre>{JSON.stringify(mutationCreateMint.data, null, 2)}</pre> : null}
    </Stack>
  )
}
