import { useUmi } from '@/features/solana'
import { ActionIcon, Loader, rem, TextInput, useMantineTheme } from '@mantine/core'
import { fetchAssetV1, fetchCollectionV1 } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import { LucideArrowRight, LucideSearch } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { validatePubkey } from '../form'

export function ExplorerSearch() {
  const { umi } = useUmi()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const theme = useMantineTheme()

  const handleSearch = useCallback(() => {
    setLoading(true)
    setError(null)
    if (!search) {
      setLoading(false)
      setError('Search cannot be empty')
      return
    }

    const cleaned = search.trim()

    if (!validatePubkey(cleaned)) {
      setLoading(false)
      setError('Invalid address')
      return
    }

    const doIt = async () => {
      const address = publicKey(cleaned)
      try {
        try {
          const asset = await fetchAssetV1(umi, address)
          navigate(`/mpl-core/explorer/${asset.publicKey}`)
          return
        } catch (e) {
          console.log('error', e)
          // do nothing
        }

        try {
          const collection = await fetchCollectionV1(umi, address)
          navigate(`/mpl-core/explorer/collection/${collection.publicKey}`)
          return
        } catch (e) {
          console.log('error', e)
          // do nothing
        }
      } finally {
        setLoading(false)
      }
      setError('No asset or collection found at this address')
    }

    doIt()
  }, [umi, search])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        handleSearch()
      }}
    >
      <TextInput
        radius="xl"
        size="md"
        placeholder="Find an asset or collection by address"
        rightSectionWidth={42}
        leftSection={
          loading ? <Loader size="sm" /> : <LucideSearch style={{ width: rem(18), height: rem(18) }} stroke={'1.5'} />
        }
        rightSection={
          <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" onClick={handleSearch}>
            <LucideArrowRight style={{ width: rem(18), height: rem(18) }} stroke={'1.5'} />
          </ActionIcon>
        }
        error={error}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
    </form>
  )
}
