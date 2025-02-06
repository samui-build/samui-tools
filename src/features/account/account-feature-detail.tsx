import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { AccountFeatureDetailPage } from './account-feature-detail-page.tsx'

export function AccountFeatureDetail() {
  const params = useParams()
  const address = useMemo(() => {
    if (!params.address) {
      return
    }
    try {
      return new PublicKey(params.address).toString()
    } catch (e) {
      console.log(`Invalid public key`, e)
    }
  }, [params])

  if (!address) {
    return <div>Error loading account</div>
  }

  return <AccountFeatureDetailPage address={address} />
}
