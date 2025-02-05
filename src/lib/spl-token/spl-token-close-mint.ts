import { SplTokenBaseInput } from '@/lib/spl-token/spl-token-base-input.ts'
import { PublicKey } from '@solana/web3.js'

export interface SplTokenCloseMintInput extends SplTokenBaseInput {
  mint: PublicKey
}

export async function splTokenCloseMint(input: SplTokenCloseMintInput) {
  console.log('splTokenCloseMint', input)
  return false
}
