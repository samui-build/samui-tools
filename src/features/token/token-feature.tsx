import { ellipsify } from '@/features/account/ui/account-ui.tsx'
import { useKeypairList } from '@/features/keypair/data-access/use-token-mint-list.ts'
import { TokenFeatureMintDetail } from '@/features/token/token-feature-mint-detail.tsx'
import { TokenFeatureMintImport } from '@/features/token/token-feature-mint-import.tsx'
import { TokenFeatureMintList } from '@/features/token/token-feature-mint-list.tsx'
import { UiPageWithRoutes } from '@/ui'
import { Alert, Button, Loader, Stack } from '@mantine/core'
import { useConnection } from '@solana/wallet-adapter-react'
import { Keypair as SolanaKeypair } from '@solana/web3.js'
import { LucideCoins } from 'lucide-react'
import { useState } from 'react'
import { Keypair } from '../keypair/data-access/keypair-db'

export default function TokenFeature() {
  const { connection } = useConnection()
  const query = useKeypairList()
  const [feePayerPublicKey, setFeePayerPublicKey] = useState<string>('FeeSoLT7WdoZVXsBPSZc7WKEuhVDVA1TKrNQoHacvxYm')

  if (query.isLoading) {
    return <Loader />
  }

  const foundKeypair = query.data?.find((keypair) => keypair.publicKey === feePayerPublicKey)

  if (!connection || !feePayerPublicKey || !foundKeypair) {
    return <KeypairUiSelect keypairs={query.data ?? []} setFeePayerPublicKey={setFeePayerPublicKey} />
  }

  const feePayerKeypair = SolanaKeypair.fromSecretKey(new Uint8Array(foundKeypair?.secretKey ?? []))

  return (
    <UiPageWithRoutes
      title="Tokens"
      icon={<LucideCoins size={24} />}
      action={
        <Button variant="light" disabled size="xs">
          Fee Payer: {ellipsify(feePayerPublicKey)}
        </Button>
      }
      routes={[
        { index: true, element: <TokenFeatureMintList /> },
        { path: 'import', element: <TokenFeatureMintImport connection={connection} /> },
        { path: ':mintId/*', element: <TokenFeatureMintDetail feePayer={feePayerKeypair} connection={connection} /> },
      ]}
    />
  )
}

function KeypairUiSelect({
  keypairs,
  setFeePayerPublicKey,
}: {
  keypairs: Keypair[]
  setFeePayerPublicKey: (publicKey: string) => void
}) {
  return (
    <Alert title="Select Fee Payer" color="blue" m="md">
      <p>Please select a fee payer to continue.</p>
      <Stack>
        {keypairs?.map((keypair) => (
          <Button
            ff="monospace"
            key={keypair.id}
            onClick={() => setFeePayerPublicKey(keypair.publicKey)}
            variant="light"
            size="xs"
          >
            {keypair.publicKey}
          </Button>
        ))}
      </Stack>
    </Alert>
  )
}
