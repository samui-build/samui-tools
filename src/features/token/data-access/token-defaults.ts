import { TokenMint } from '@/features/token/data-access/token-db.ts'
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'

export type TokenDefaultsInput = Omit<TokenMint, 'id'>

export const tokenDefaults: TokenDefaultsInput[] = [
  {
    address: 'testiyk3LN7Fqf41pc41i2NKBycxeV9sUvxV8uwwWoo',
    programId: TOKEN_2022_PROGRAM_ID.toString(),
    decimals: 6,
    secretKey: [
      209, 246, 214, 110, 214, 173, 51, 166, 211, 149, 213, 43, 92, 198, 96, 207, 12, 27, 85, 70, 49, 223, 111, 162,
      218, 141, 247, 139, 230, 30, 248, 159, 13, 59, 115, 13, 149, 98, 131, 29, 92, 182, 22, 5, 47, 182, 129, 226, 85,
      212, 92, 72, 250, 167, 20, 157, 186, 110, 71, 50, 7, 15, 24, 190,
    ],
  },
]
