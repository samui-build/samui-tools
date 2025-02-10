export interface AppConstants {
  prefix: string // Application-wide prefix used for default contexts like storage, etc.
}

export const appConstants = {
  prefix: 'samui',
}

export function getPrefixedName(name: string) {
  return `${appConstants.prefix}-${name}`
}
