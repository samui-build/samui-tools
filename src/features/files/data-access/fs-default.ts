import { getPrefixedName } from '@/app-constants.ts'
import FS from '@isomorphic-git/lightning-fs'

export const fsDefault = new FS(getPrefixedName(`-fs-default`)).promises
