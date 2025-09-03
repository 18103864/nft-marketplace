// lib/env.ts
export const PROGRAM_ID = process.env.NEXT_PUBLIC_PROGRAM_ID!
export const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com'
export const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
export const PINATA_JWT = process.env.PINATA_JWT
export const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'https://gateway.pinata.cloud/ipfs'
export const TOKEN_METADATA_PROGRAM = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'