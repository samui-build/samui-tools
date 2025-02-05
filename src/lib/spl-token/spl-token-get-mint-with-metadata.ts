import { Metadata } from '@metaplex-foundation/mpl-token-metadata'
import { getMint, getTokenMetadata, Mint, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { SplTokenBaseInput } from './spl-token-base-input.ts'

export interface SplTokenGetMintInput extends Omit<SplTokenBaseInput, 'programId'> {
  mint: PublicKey
}

export interface SplTokenGetMintWithMetadataResult {
  account: AccountInfo<ParsedAccountData> | null
  tokenMetadata: TokenMetadata | null
  mplMetadata: Metadata | null
  mint: Mint
}

export async function splTokenGetMintWithMetadata({
  connection,
  commitment = 'confirmed',
  ...input
}: SplTokenGetMintInput): Promise<SplTokenGetMintWithMetadataResult | null> {
  const account = await connection.getParsedAccountInfo(input.mint)
  if (!account || !account.value || !account.value.data) {
    throw `Mint not found`
  }
  const programId = new PublicKey(account.value?.owner)
  const mint = await getMint(connection, input.mint, commitment, programId)
  if (!mint) {
    return null
  }

  if (!programId.equals(TOKEN_2022_PROGRAM_ID)) {
    return { tokenMetadata: null, mplMetadata: null, mint, account: account.value as AccountInfo<ParsedAccountData> }
  }

  const tokenMetadata = await getTokenMetadata(connection, input.mint)
  if (!tokenMetadata) {
    return { tokenMetadata: null, mplMetadata: null, mint, account: account.value as AccountInfo<ParsedAccountData> }
  }

  const mplMetadata: Metadata = await fetch(tokenMetadata.uri).then((res) => res.json())

  return { tokenMetadata, mplMetadata, mint, account: account.value as AccountInfo<ParsedAccountData> }
}
