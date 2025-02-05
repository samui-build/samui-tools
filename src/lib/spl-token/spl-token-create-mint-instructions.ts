import {
  createInitializeInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintCloseAuthorityInstruction,
  createInitializeMintInstruction,
  createUpdateFieldInstruction,
} from '@solana/spl-token'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { Keypair as SolanaKeypair, PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js'

export interface SplTokenCreateMintMetadataInput extends Omit<TokenMetadata, 'additionalMetadata' | 'mint' | 'uri'> {
  additionalMetadata?: [string, string][]
  image?: string
  mintAuthority?: PublicKey
  name: string
  symbol: string
  updateAuthority?: PublicKey
  uri: string
}

export interface SplTokenCreateMintInstructionsInput {
  closeAuthority?: PublicKey
  decimals: number
  feePayer: SolanaKeypair
  lamports: number
  metadata: SplTokenCreateMintMetadataInput
  mint: SolanaKeypair
  mintAuthority?: PublicKey
  space: number
  programId: PublicKey
}

export function splTokenCreateMintInstructions({
  closeAuthority,
  decimals,
  feePayer,
  lamports,
  metadata,
  mint,
  mintAuthority,
  programId,
  space,
}: SplTokenCreateMintInstructionsInput) {
  const ix: TransactionInstruction[] = [
    SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: mint.publicKey,
      space,
      lamports,
      programId,
    }),
  ]

  if (closeAuthority) {
    ix.push(
      createInitializeMintCloseAuthorityInstruction(
        mint.publicKey, // Mint Account address
        closeAuthority, // Designated Close Authority
        programId, // Token Extension Program ID
      ),
    )
  }

  if (metadata) {
    ix.push(
      createInitializeMetadataPointerInstruction(
        mint.publicKey, // Mint Account Address
        feePayer.publicKey, // Authority that can set the metadata address
        mint.publicKey, // Account address that holds the metadata
        programId, // Token Extension Program ID
      ),
    )
  }

  // Mint the token
  ix.push(
    createInitializeMintInstruction(
      mint.publicKey, // Mint Account Address
      decimals, // Decimals of Mint
      mintAuthority ?? feePayer.publicKey, // Designated Mint Authority
      null,
      programId, // Token Extension Program ID
    ),
  )

  if (metadata) {
    ix.push(
      createInitializeInstruction({
        programId: programId, // Token Extension Program ID
        metadata: mint.publicKey, // Account address that holds the metadata
        updateAuthority: metadata.updateAuthority ?? feePayer.publicKey, // Authority that can update the metadata
        mint: mint.publicKey, // Mint Account Address
        mintAuthority: feePayer.publicKey, // Designated Mint Authority
        name: metadata.name, // Name of the token
        symbol: metadata.symbol, // Symbol of the token
        uri: metadata.uri, // URI of the token
      }),
    )

    for (const [field, value] of metadata.additionalMetadata ?? []) {
      ix.push(
        createUpdateFieldInstruction({
          programId,
          metadata: mint.publicKey,
          updateAuthority: metadata.updateAuthority ?? feePayer.publicKey,
          field,
          value,
        }),
      )
    }
  }

  return ix
}
