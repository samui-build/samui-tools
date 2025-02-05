import { SplTokenBaseInput } from '@/lib/spl-token/spl-token-base-input.ts'
import { PublicKey } from '@solana/web3.js'

export interface SplTokenCreateAccountInput extends SplTokenBaseInput {
  mint: PublicKey
}

export async function splTokenCreateAccount(input: SplTokenCreateAccountInput) {
  console.log('splTokenCreateAccount', input)
  return false
}
