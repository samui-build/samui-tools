import { useMutation } from '@tanstack/react-query'

export function useGetSnapshots(endpoint: string) {
  return useMutation({
    mutationFn: async () => {
      return await fetch(`${endpoint}/snapshots`).then((res) => res.json())
    },
  })
}

export function useGetSnapshotsForWallet(endpoint: string) {
  return useMutation({
    mutationFn: async (wallet: string) => {
      return await fetch(`${endpoint}/wallet/${wallet}`)
        .then((res) => res.json())
        .then((res) => res as { snapshots: Record<string, { amount: number; allocation: number }> })
    },
  })
}
