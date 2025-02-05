import { ExtensionType, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from '@solana/spl-token'
import { pack, TokenMetadata } from '@solana/spl-token-metadata'
import { Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from '@solana/web3.js'
import { SplTokenBaseInput } from './spl-token-base-input.ts'
import {
  splTokenCreateMintInstructions,
  SplTokenCreateMintMetadataInput,
} from './spl-token-create-mint-instructions.ts'

export interface SplTokenCreateMintInput extends SplTokenBaseInput {
  feePayer: Keypair
  mint: Keypair
  authority: PublicKey
  decimals: number
  closeAuthority?: PublicKey
  mintAuthority?: PublicKey
  metadata: SplTokenCreateMintMetadataInput
}

export async function splTokenCreateMint({
  connection,
  commitment = 'confirmed',
  programId,
  ...input
}: SplTokenCreateMintInput) {
  if (programId.toString() !== TOKEN_2022_PROGRAM_ID.toString()) {
    throw new Error(
      'We currently only support the SPL Token 2022 program. Create an issue if you need support for other programs.',
    )
  }
  // TODO: Make the extensions configurable
  const extensions: ExtensionType[] = [ExtensionType.MintCloseAuthority, ExtensionType.MetadataPointer]
  const mintLen = getMintLen(extensions)

  const metadata: TokenMetadata = {
    additionalMetadata: input.metadata.additionalMetadata ?? [],
    mint: input.mint.publicKey,
    name: input.metadata.name,
    symbol: input.metadata.symbol,
    updateAuthority: input.metadata.updateAuthority ?? input.feePayer.publicKey,
    uri: input.metadata.uri,
  }

  const metadataLen = pack(metadata).length + TYPE_SIZE + LENGTH_SIZE
  const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen)

  console.log(
    `Summary`,
    JSON.stringify(
      {
        mintLen,
        metadataLen,
        lamports,
        metadata,
        '-----': '-----',
        feePayer: input.feePayer,
        mint: input.mint,
        programId,
        decimals: input.decimals,
        closeAuthority: input.closeAuthority,
        mintAuthority: input.mintAuthority,
      },
      null,
      2,
    ),
  )

  const txs = splTokenCreateMintInstructions({
    lamports,
    feePayer: input.feePayer,
    mint: input.mint,
    programId,
    decimals: input.decimals,
    closeAuthority: input.closeAuthority ?? input.feePayer.publicKey,
    mintAuthority: input.mintAuthority ?? input.feePayer.publicKey,
    metadata: input.metadata,
    space: mintLen,
  })
  const transaction = new Transaction().add(...txs)

  return sendAndConfirmTransaction(
    connection,
    transaction,
    [input.feePayer, input.mint], // Signers
    { skipPreflight: true, commitment },
  )
}
