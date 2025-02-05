import { SplTokenBaseInput } from '@/lib/spl-token/spl-token-base-input.ts'
import { PublicKey } from '@solana/web3.js'

export interface SplTokenMintTokensInput extends SplTokenBaseInput {
  mint: PublicKey
}

export async function splTokenMintTokens(input: SplTokenMintTokensInput) {
  //
  console.log('splTokenMintTokens', input)
  return false
}
