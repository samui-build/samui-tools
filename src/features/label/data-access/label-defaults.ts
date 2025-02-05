import { LabelGroup } from './label-db.ts'

export type LabelDefaultsInput = LabelGroup & { labels: Record<string, string> }

export const labelDefaults: LabelDefaultsInput[] = [
  {
    id: 'custom',
    name: 'Custom',
    labels: {},
  },
  {
    id: 'metaplex',
    name: 'Metaplex',
    labels: {
      // https://developers.metaplex.com/official-links
      CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d: 'Metaplex Core',
      CMAGAKJ67e9hRZgfC5SFTbZH8MgEmtqazKXjmkaJjWTJ: 'Metaplex Core Candy Guard',
      CMACYFENjoBMHzapRXyo1JZkVS6EtaDDzkjMrmQLvr4J: 'Metaplex Core Candy Machine',
      metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s: 'Metaplex Token Metadata',
    },
  },
  {
    id: 'solana',
    name: 'Solana',
    labels: {
      // Source: https://github.com/solscanofficial/labels
      '11111111111111111111111111111111': 'System Program',
      ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL: 'Associated Token Account Program',
      AddressLookupTab1e1111111111111111111111111: 'Address Lookup Table Program',
      AddressMap111111111111111111111111111111111: 'Address Map Program',
      BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY: 'Bubblegum',
      BPFLoader1111111111111111111111111111111111: 'BPF Loader',
      BPFLoader2111111111111111111111111111111111: 'BPF Loader 2',
      BPFLoaderUpgradeab1e11111111111111111111111: 'BPF Upgradeable Loader',
      CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR: 'Candy Machine Core',
      ComputeBudget111111111111111111111111111111: 'Compute Budget',
      Feat1YXHhH6t1juaWF74WLcfv4XoNocjXA6sPWHNgAse: 'Feature Proposal Program',
      KeccakSecp256k11111111111111111111111111111: 'Secp256k1 Program',
      Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo: 'Memo Program',
      MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr: 'Memo Program v2',
      MoveLdr111111111111111111111111111111111111: 'Move Loader',
      NativeLoader1111111111111111111111111111111: 'Native Loader',
      Stake11111111111111111111111111111111111111: 'Stake Program',
      Sysvar1111111111111111111111111111111111111: 'SYSVAR',
      Sysvar1nstructions1111111111111111111111111: 'Sysvar: Instructions',
      SysvarC1ock11111111111111111111111111111111: 'Clock Program',
      SysvarEpochSchedu1e111111111111111111111111: 'Sysvar: Epoch Schedule',
      SysvarFees111111111111111111111111111111111: 'Sysvar: Fees',
      SysvarRecentB1ockHashes11111111111111111111: 'Sysvar: Recent Blockhashes',
      SysvarRent111111111111111111111111111111111: 'Rent Program',
      SysvarRewards111111111111111111111111111111: 'Sysvar: Rewards',
      SysvarS1otHashes111111111111111111111111111: 'Sysvar: Slot Hashes',
      SysvarS1otHistory11111111111111111111111111: 'Sysvar: Slot History',
      SysvarStakeHistory1111111111111111111111111: 'Sysvar: Stake History',
      TokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL: 'Associated Token Program',
      TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: 'Token Program',
      TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb: 'Token 2022 Program',
      Vote111111111111111111111111111111111111111: 'Vote Program',
    },
  },
]
