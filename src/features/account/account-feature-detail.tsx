import { Container, Stack } from '@mantine/core'
import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { ExplorerLink } from '../cluster/ui'
import { AccountBalance, AccountButtons, AccountTokens, AccountTransactions, ellipsify } from './ui/account-ui'

export default function AccountFeatureDetail() {
  const params = useParams()
  const address = useMemo(() => {
    if (!params.address) {
      return
    }
    try {
      return new PublicKey(params.address)
    } catch (e) {
      console.log(`Invalid public key`, e)
    }
  }, [params])
  if (!address) {
    return <div>Error loading account</div>
  }

  return (
    <Container py="xl" my="xl">
      <Stack align="center" gap="xl">
        <AccountBalance order={2} address={address} />
        <ExplorerLink path={`account/${address}`} label={ellipsify(address.toString())} />
        <AccountButtons address={address} />
      </Stack>

      <Stack>
        <AccountTokens address={address} />
        <AccountTransactions address={address} />
      </Stack>
    </Container>
  )
}
