import { Keypair } from './keypair-db'

export type TokenDefaultsInput = Omit<Keypair, 'id'>

export const keypairDefaults: TokenDefaultsInput[] = [
  {
    publicKey: 'FeeSoLT7WdoZVXsBPSZc7WKEuhVDVA1TKrNQoHacvxYm',
    secretKey: [
      251, 229, 135, 226, 163, 58, 170, 138, 88, 66, 201, 41, 199, 105, 239, 254, 179, 151, 35, 195, 79, 65, 51, 219,
      69, 205, 8, 133, 149, 48, 0, 239, 217, 168, 114, 37, 124, 187, 159, 34, 3, 156, 137, 10, 214, 174, 216, 128, 69,
      13, 199, 101, 18, 78, 173, 84, 30, 55, 225, 241, 225, 58, 203, 6,
    ],
  },
  {
    publicKey: 'ALiceWVGfrWkFr3UkJPoDVQvUjkWgRGwVJqUGpw5CZrz',
    secretKey: [
      75, 14, 240, 133, 91, 103, 157, 201, 173, 66, 77, 156, 173, 201, 99, 96, 17, 4, 70, 159, 29, 128, 48, 55, 163,
      196, 188, 1, 152, 110, 181, 132, 138, 198, 69, 128, 24, 26, 43, 235, 172, 90, 81, 67, 72, 29, 72, 161, 230, 42,
      184, 1, 60, 35, 163, 194, 235, 90, 218, 16, 241, 85, 213, 203,
    ],
  },
  {
    publicKey: 'BoBBYrdKhKZspfrpWMCBFWapdnHW6BQ2W9WXRxjdWqEX',
    secretKey: [
      125, 9, 230, 95, 50, 252, 91, 244, 149, 213, 82, 114, 76, 28, 199, 123, 232, 46, 108, 175, 221, 74, 9, 38, 99,
      112, 50, 61, 56, 106, 10, 163, 160, 105, 25, 99, 106, 27, 5, 152, 189, 80, 204, 132, 212, 173, 150, 76, 205, 13,
      198, 68, 89, 61, 214, 112, 85, 208, 195, 248, 8, 123, 238, 152,
    ],
  },
]
