// lib/actions.ts
'use client'

import * as anchor from '@coral-xyz/anchor'
import { Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js'
import { getProgram } from '@/lib/anchor'
import { PROGRAM_ID, TOKEN_METADATA_PROGRAM } from '@/lib/env'
import { getListingPda, getMarketplacePda, getMetadataPda, getAta } from '@/lib/pdas'
import { WalletContextState } from '@solana/wallet-adapter-react'
import { createMintFileAndJson } from '@/lib/pinata'
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token'

export async function createNft({
  connection,
  wallet,
  name,
  symbol,
  description,
  sellerFeeBasisPoints,
  file,
}: {
  connection: Connection
  wallet: WalletContextState
  name: string
  symbol: string
  description?: string
  sellerFeeBasisPoints: number
  file: File
}) {
  if (!wallet.publicKey || !wallet.signTransaction) throw new Error('Wallet not ready')

  const program = getProgram(connection, wallet as any)
  const mint = anchor.web3.Keypair.generate()
  const [metadataPda] = getMetadataPda(mint.publicKey)

  const meta = await createMintFileAndJson({ file, name, symbol, description, sellerFeeBasisPoints })
  if (!meta?.metadataUri) throw new Error('Pinata upload failed')
  const uri = meta.metadataUri

  const tx = await program.methods
    .createNft(name, symbol, uri, sellerFeeBasisPoints)
    .accountsStrict({
      metadata: metadataPda,
      mint: mint.publicKey,
      tokenAccount: getAta(mint.publicKey, wallet.publicKey),
      creator: wallet.publicKey,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenMetadataProgram: new PublicKey(TOKEN_METADATA_PROGRAM),
    } as any)
    .signers([mint])
    .transaction()

  tx.feePayer = wallet.publicKey
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  tx.partialSign(mint)
  const signed = await wallet.signTransaction(tx)
  const sig = await connection.sendRawTransaction(signed.serialize(), { skipPreflight: false })
  await connection.confirmTransaction(sig, 'processed')
  return sig
}

export async function createListing({
  connection,
  wallet,
  mint,
  priceLamports,
}: {
  connection: Connection
  wallet: WalletContextState
  mint: string
  priceLamports: number
}) {
  if (!wallet.publicKey) throw new Error('Wallet not ready')
  const program = getProgram(connection, wallet as any)
  const mintPk = new PublicKey(mint)
  const [listingPda] = getListingPda(program.programId, mintPk)
  const sellerAta = getAta(mintPk, wallet.publicKey)
  const escrowAta = getAta(mintPk, listingPda, true)
  const [metadataPda] = getMetadataPda(mintPk)

  const txSig = await program.methods
    .createListing(new anchor.BN(priceLamports))
    .accountsStrict({
      listing: listingPda,
      seller: wallet.publicKey,
      mint: mintPk,
      sellerTokenAccount: sellerAta,
      escrowTokenAccount: escrowAta,
      metadata: metadataPda,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenMetadataProgram: new PublicKey(TOKEN_METADATA_PROGRAM),
    } as any)
    .rpc()
  return txSig
}

export async function buyNft({
  connection,
  wallet,
  mint,
}: {
  connection: Connection
  wallet: WalletContextState
  mint: string
}) {
  if (!wallet.publicKey) throw new Error('Wallet not ready')
  const program = getProgram(connection, wallet as any)
  const mintPk = new PublicKey(mint)
  const [listingPda] = getListingPda(program.programId, mintPk)
  const [marketplacePda] = getMarketplacePda(program.programId)
  const escrowAta = getAta(mintPk, listingPda, true)
  const buyerAta = getAta(mintPk, wallet.publicKey)
  const [metadataPda] = getMetadataPda(mintPk)

  // FIX: use bracket access to satisfy TS with non-generic Program<Idl>
  const listingAcc = await (program.account as any)['listing'].fetch(listingPda)
  const marketAcc = await (program.account as any)['marketplace'].fetch(marketplacePda)

  const txSig = await program.methods
    .buyNft()
    .accountsStrict({
      listing: listingPda,
      marketplace: marketplacePda,
      buyer: wallet.publicKey,
      seller: new PublicKey(listingAcc.seller),
      marketplaceAuthority: new PublicKey(marketAcc.authority),
      mint: mintPk,
      escrowTokenAccount: escrowAta,
      buyerTokenAccount: buyerAta,
      metadata: metadataPda,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      tokenMetadataProgram: new PublicKey(TOKEN_METADATA_PROGRAM),
    } as any)
    .rpc()
  return txSig
}

export async function cancelListing({
  connection,
  wallet,
  mint,
}: {
  connection: Connection
  wallet: WalletContextState
  mint: string
}) {
  if (!wallet.publicKey) throw new Error('Wallet not ready')
  const program = getProgram(connection, wallet as any)
  const mintPk = new PublicKey(mint)
  const [listingPda] = getListingPda(program.programId, mintPk)
  const escrowAta = getAta(mintPk, listingPda, true)
  const sellerAta = getAta(mintPk, wallet.publicKey)

  const txSig = await program.methods
    .cancelListing()
    .accountsStrict({
      listing: listingPda,
      seller: wallet.publicKey,
      mint: mintPk,
      escrowTokenAccount: escrowAta,
      sellerTokenAccount: sellerAta,
      tokenProgram: TOKEN_PROGRAM_ID,
    } as any)
    .rpc()
  return txSig
}

export async function updateListingPrice({
  connection,
  wallet,
  mint,
  newPriceLamports,
}: {
  connection: Connection
  wallet: WalletContextState
  mint: string
  newPriceLamports: number
}) {
  if (!wallet.publicKey) throw new Error('Wallet not ready')
  const program = getProgram(connection, wallet as any)
  const mintPk = new PublicKey(mint)
  const [listingPda] = getListingPda(program.programId, mintPk)

  const txSig = await program.methods
    .updateListingPrice(new anchor.BN(newPriceLamports))
    .accountsStrict({
      listing: listingPda,
      seller: wallet.publicKey,
      mint: mintPk,
    } as any)
    .rpc()
  return txSig
}

export async function initializeMarketplace({
  connection,
  wallet,
  feePercent,
}: {
  connection: Connection
  wallet: WalletContextState
  feePercent: bigint
}) {
  if (!wallet.publicKey) throw new Error('Wallet not ready')
  const program = getProgram(connection, wallet as any)
  const [marketplacePda] = getMarketplacePda(program.programId)

  const txSig = await program.methods
    .initializeMarketplace(new anchor.BN(feePercent.toString()))
    .accountsStrict({
      marketplace: marketplacePda,
      authority: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    } as any)
    .rpc()
  return txSig
}

// Helper preserved as-is
export async function getListingForMint(mint: string) {
  const programId = new PublicKey(PROGRAM_ID)
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, 'processed')
  const mintPk = new PublicKey(mint)
  const [listingPda] = getListingPda(programId, mintPk)
  const idl = (await import('@/lib/idl/nft_marketplace_idl.json')).default as any
  const coder = new anchor.BorshCoder(idl)
  const info = await conn.getAccountInfo(listingPda)
  if (!info) return null
  // IMPORTANT: use PascalCase
  const data = coder.accounts.decode('Listing', info.data) as any
  return {
    pda: listingPda.toBase58(),
    isActive: data.isActive,
    price: data.price.toString(),
  }
}

export async function getOwnedNftsWithMetadata(connection: Connection, owner: PublicKey) {
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID })
  const mints = tokenAccounts.value
    .filter((acc) => {
      const info: any = acc.account.data.parsed.info
      return info.tokenAmount.decimals === '0' || info.tokenAmount.decimals === 0
    })
    .filter((acc) => {
      const info: any = acc.account.data.parsed.info
      return Number(info.tokenAmount.uiAmount) === 1
    })
    .map((acc) => new PublicKey((acc.account.data.parsed as any).info.mint))

  const items: { mint: string; name?: string; image?: string; symbol?: string; uri?: string }[] = []
  const { fetchNftMetadata, fetchJson } = await import('@/lib/metaplex')
  for (const mint of mints) {
    const meta = await fetchNftMetadata(connection, mint)
    if (!meta?.uri) {
      items.push({ mint: mint.toBase58() })
      continue
    }
    const json = await fetchJson<any>(meta.uri)
    items.push({
      mint: mint.toBase58(),
      name: json?.name || meta.name,
      image: json?.image,
      symbol: meta.symbol,
      uri: meta.uri,
    })
  }
  const map = new Map(items.map((i) => [i.mint, i]))
  return Array.from(map.values())
}