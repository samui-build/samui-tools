import Dexie, { Table } from 'dexie'
import { labelDefaults } from './label-defaults.ts'

export interface LabelGroup {
  id: string
  name: string
  // TODO: Add readonly flag
  // The readonly flag is used to prevent any changes to the group.
  // TODO: Add source uri
  // The source uri is used to provide a link to the source of the group so that a user can fetch and refresh the group.
  // The users are encouraged to share their own sources for their apps.
}

export interface LabelItem {
  id: string
  groupId: string
  address: string
  label: string
}

export async function populate(db: LabelDb) {
  for (const { labels, id, name } of labelDefaults) {
    await db.groups.add({ id, name })
    for (const { address, label } of Object.keys(labels).map((address) => ({ address, label: labels[address] }))) {
      await db.labels.add({ id: crypto.randomUUID(), groupId: id, address, label })
    }
  }
}

export class LabelDb extends Dexie {
  groups!: Table<LabelGroup, string>
  labels!: Table<LabelItem, string>

  constructor() {
    super('samui-label-db')
    this.version(1).stores({
      groups: 'id',
      labels: 'id,groupId,address,label',
    })

    this.on('populate', async () => {
      await populate(this)
    })
  }

  deleteGroup(groupId: string) {
    return this.transaction('rw', this.labels, this.groups, () => {
      this.labels.where({ groupId }).delete()
      this.groups.delete(groupId)
    })
  }
}

export const labelDb = new LabelDb()
