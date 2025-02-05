import { Commitment, Connection, PublicKey } from '@solana/web3.js'

export interface SplTokenBaseInput {
  connection: Connection
  commitment?: Commitment
  programId: PublicKey
}