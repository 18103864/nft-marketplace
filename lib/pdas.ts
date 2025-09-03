// lib/pdas.ts
import { PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from '@solana/spl-token'
import { TOKEN_METADATA_PROGRAM } from '@/lib/env'

export const MARKETPLACE_SEED = Buffer.from('marketplace')
export const LISTING_SEED = Buffer.from('listing')
export const METADATA_SEED = Buffer.from('metadata')

export function getMarketplacePda(programId: PublicKey) {
  return PublicKey.findProgramAddressSync([MARKETPLACE_SEED], programId)
}

export function getListingPda(programId: PublicKey, mint: PublicKey) {
  return PublicKey.findProgramAddressSync([LISTING_SEED, mint.toBuffer()], programId)
}

export function getMetadataPda(mint: PublicKey) {
  const programKey = new PublicKey(TOKEN_METADATA_PROGRAM)
  // Metaplex metadata PDA: ["metadata", token_metadata_program_id, mint]
  return PublicKey.findProgramAddressSync(
    [METADATA_SEED, programKey.toBuffer(), mint.toBuffer()],
    programKey
  )
}

export function getAta(mint: PublicKey, owner: PublicKey, allowOwnerOffCurve = false) {
  return getAssociatedTokenAddressSync(mint, owner, allowOwnerOffCurve)
}