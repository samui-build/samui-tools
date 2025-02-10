import { PromisifiedFS } from '@isomorphic-git/lightning-fs'

export async function fsInitialize(fs: PromisifiedFS) {
  try {
    await fs.readdir('/')
    return fs
  } catch (error) {
    console.warn(`initializeFs: Error loading filesystem, trying to generate it! ${error}`)
    await fs.mkdir('/')
    console.log(`initializeFs: Generated filesystem`)
    return fs
  }
}