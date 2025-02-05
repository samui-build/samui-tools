import { SplTokenBaseInput } from '@/lib/spl-token/spl-token-base-input.ts'
import { PublicKey } from '@solana/web3.js'

export interface SplTokenBurnTokensInput extends SplTokenBaseInput {
  mint: PublicKey
}

export async function splTokenBurnTokens(input: SplTokenBurnTokensInput) {
  console.log('splTokenBurnTokens', input)
  return false
}
