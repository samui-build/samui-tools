import { toastError } from '@/ui'
import { Helius, Webhook } from 'helius-sdk'

export async function heliusGetAllWebhooks(helius: Helius): Promise<Webhook[]> {
  try {
    return helius.getAllWebhooks()
  } catch (error) {
    console.log(error)
    toastError(`Error calling getAllWebhooks: ${error}`)
    return []
  }
}
