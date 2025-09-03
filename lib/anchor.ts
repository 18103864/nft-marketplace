// lib/anchor.ts
import * as anchor from '@coral-xyz/anchor'
import { Connection } from '@solana/web3.js'
import { PROGRAM_ID } from '@/lib/env'
import idlJson from '@/lib/idl/nft_marketplace_idl.json' assert { type: 'json' }

export function getAnchorProvider(connection: Connection, wallet: anchor.Wallet) {
  return new anchor.AnchorProvider(connection, wallet, {
    preflightCommitment: 'processed',
    commitment: 'processed',
  })
}

export function getProgram(connection: Connection, wallet: anchor.Wallet) {
  const provider = getAnchorProvider(connection, wallet)
  const programId = new anchor.web3.PublicKey(PROGRAM_ID)
  // Use non-generic Program to relax TS account typing
  return new anchor.Program(idlJson as anchor.Idl, provider)
}

export function getServerCoder() {
  return new anchor.BorshCoder(idlJson as anchor.Idl)
}