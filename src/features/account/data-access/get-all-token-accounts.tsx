import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Connection, PublicKey } from '@solana/web3.js'

export async function getAllTokenAccounts(connection: Connection, address: PublicKey) {
  const [tokenAccounts, token2022Accounts] = await Promise.all([
    connection.getParsedTokenAccountsByOwner(address, { programId: TOKEN_PROGRAM_ID }),
    connection.getParsedTokenAccountsByOwner(address, { programId: TOKEN_2022_PROGRAM_ID }),
  ])
  return [...tokenAccounts.value, ...token2022Accounts.value]
}
