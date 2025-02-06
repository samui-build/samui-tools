import { PublicKey } from '@solana/web3.js'

export type PublicKeyString = PublicKey | string

export function getPublicKey(address: PublicKeyString): PublicKey {
  if (typeof address === 'string') {
    return isValidPublicKey(address)
  }
  return address
}

export function isValidPublicKey(address: PublicKeyString): PublicKey {
  try {
    return new PublicKey(address)
  } catch (e) {
    throw new Error(`Invalid public key: ${address}`)
  }
}
