import { tokenDefaults } from '@/features/token/data-access/token-defaults.ts'
import Dexie, { Table } from 'dexie'

export interface TokenMint {
  id: string
  address: string
  programId: string
  decimals: number
  secretKey?: number[]
}

export async function populate(db: TokenDb) {
  for (const { address, ...defaults } of tokenDefaults) {
    await db.mints.add({ id: address, address, ...defaults })
  }
}

export class TokenDb extends Dexie {
  mints!: Table<TokenMint, string>

  constructor() {
    super('samui-token-db')
    this.version(1).stores({
      mints: 'id',
    })

    this.on('populate', async () => {
      await populate(this)
    })
  }
}

export const tokenDb = new TokenDb()
