import Dexie, { Table } from 'dexie'
import { keypairDefaults } from './keypair-defaults'

export interface Keypair {
  id: string
  publicKey: string
  secretKey: number[]
}

export async function populate(db: KeypairDb) {
  for (const { publicKey, ...defaults } of keypairDefaults) {
    await db.keypairs.add({ id: publicKey, publicKey, ...defaults })
  }
}

export class KeypairDb extends Dexie {
  keypairs!: Table<Keypair, string>

  constructor() {
    super('samui-keypair-db')
    this.version(1).stores({
      keypairs: 'id,publicKey',
    })

    this.on('populate', async () => {
      await populate(this)
    })
  }
}

export const keypairDb = new KeypairDb()
