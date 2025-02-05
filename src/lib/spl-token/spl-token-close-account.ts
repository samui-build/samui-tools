import { SplTokenBaseInput } from '@/lib/spl-token/spl-token-base-input.ts'
import { PublicKey } from '@solana/web3.js'

export interface SplTokenCloseAccountInput extends SplTokenBaseInput {
  mint: PublicKey
}

export async function splTokenCloseAccount(input: SplTokenCloseAccountInput) {
  console.log('splTokenCloseAccount', input)
  return false
}
