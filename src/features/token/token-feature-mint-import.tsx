import { useTokenMintImport } from '@/features/token/data-access/use-token-mint-detail.ts'
import { splTokenGetMintWithMetadata } from '@/lib/spl-token'
import { UiPageHeader } from '@/ui'
import { ActionIcon, Alert, Button, Stack, TextInput } from '@mantine/core'
import { Metadata } from '@metaplex-foundation/mpl-token-metadata'
import { Mint } from '@solana/spl-token'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { LucideArrowLeft, LucideSearch } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useCluster } from '../cluster/data-access'

export function TokenFeatureMintImport({ connection }: { connection: Connection }) {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [account, setAccount] = useState<AccountInfo<ParsedAccountData> | null>(null)
  const [mint, setMint] = useState<Mint | null>(null)
  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(null)

  const { cluster } = useCluster()
  const mutationCreate = useTokenMintImport()

  const mutationFind = useMutation({
    mutationFn: async (address: string) => {
      // TODO: assert isValidAddress
      const mint = new PublicKey(address)

      return splTokenGetMintWithMetadata({ connection, mint: mint })
    },
  })

  async function importMint() {
    const decimals = account?.data?.parsed?.info?.decimals
    const programId = account?.owner
    if (!decimals || !programId) {
      console.log('Invalid mint', {
        account,
      })
      return
    }
    await mutationCreate.mutateAsync({ address, decimals, programId: programId.toString() })
    navigate(`/tokens/${address}`)
  }

  async function submit() {
    if (!address.trim()?.length) {
      return
    }
    const result = await mutationFind.mutateAsync(address)
    if (!result) {
      return
    }
    setAccount(result.account)
    setMint(result.mint)
    setMetadata(result.mplMetadata)
    setTokenMetadata(result.tokenMetadata)
  }

  return (
    <Stack>
      <UiPageHeader
        title={`Import Mint`}
        icon={
          <ActionIcon component={Link} to={'/tokens'} size="sm">
            <LucideArrowLeft size={20} />
          </ActionIcon>
        }
      />
      <Alert title="Import Mint" color="blue">
        Find a mint on {cluster.name} and import it here.
      </Alert>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await submit()
        }}
      >
        <TextInput
          readOnly={mutationFind.isPending}
          label="Address"
          placeholder="Enter mint address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rightSection={
            <ActionIcon loading={mutationFind.isPending} variant="light" type="submit">
              <LucideSearch size={16} />
            </ActionIcon>
          }
        />
      </form>
      {account ? <Button onClick={importMint}>Import Mint</Button> : null}
      {account ? (
        <Alert variant="default" title="Account found">
          <pre>{JSON.stringify(account, null, 2)}</pre>
        </Alert>
      ) : null}
      {mint ? (
        <Alert variant="default" title="Mint found">
          <pre>{JSON.stringify(mint, null, 2)}</pre>
        </Alert>
      ) : null}
      <pre>{JSON.stringify({ address, mint, metadata, tokenMetadata }, null, 2)}</pre>
    </Stack>
  )
}
