import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { getPublicKey, PublicKeyString } from './public-key-string'

export async function requestAndConfirmAirdrop({
  address,
  amount,
  connection,
}: {
  connection: Connection
  address: PublicKeyString
  amount: string
}) {
  const [latestBlockhash, signature] = await Promise.all([
    connection.getLatestBlockhash(),
    connection.requestAirdrop(getPublicKey(address), parseFloat(amount) * LAMPORTS_PER_SOL),
  ])

  await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')
  return signature
}
