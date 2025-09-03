// lib/rpc.ts
import { Connection, PublicKey } from '@solana/web3.js'
import { RPC_URL, PROGRAM_ID } from '@/lib/env'
import { getServerCoder } from '@/lib/anchor'
import { fetchNftMetadata, fetchJson } from '@/lib/metaplex'
import bs58 from 'bs58'

const ACCOUNT_DISCRIMINATOR_LISTING = new Uint8Array([218, 32, 50, 73, 43, 134, 26, 58])

export async function fetchActiveListings({ limit }: { limit?: number } = {}) {
  const connection = new Connection(RPC_URL, 'processed')
  const programId = new PublicKey(PROGRAM_ID)

  const filters = [
    { memcmp: { offset: 0, bytes: bs58.encode(ACCOUNT_DISCRIMINATOR_LISTING) } },
    { memcmp: { offset: 88, bytes: bs58.encode(Uint8Array.of(1)) } }, // is_active = true
  ]

  const accounts = await connection.getProgramAccounts(programId, { filters })
  const coder = getServerCoder()

  let items: {
    mint: string
    seller: string
    price: string
    createdAt: number
    isActive: boolean
    name?: string
    symbol?: string
    image?: string
  }[] = []

  for (const acc of accounts) {
    let data: any
    try {
      // IMPORTANT: use PascalCase name from IDL JSON
      data = coder.accounts.decode('Listing', acc.account.data) as any
    } catch {
      // Skip any account we can’t decode to avoid unhandled runtime during SSR
      continue
    }

    // lib/rpc.ts (inside fetchActiveListings loop, replace the metadata/name section)
    const mint = new PublicKey(data.mint)
    const meta = await fetchNftMetadata(connection, mint)

    // inside fetchActiveListings loop after const meta = await fetchNftMetadata(...)
    let name: string | undefined = meta?.name
    let symbol: string | undefined = meta?.symbol
    let image: string | undefined

    if (meta?.uri) {
    const json = await fetchJson<any>(meta.uri)
    if (json) {
        // Prefer JSON name if present; otherwise keep on-chain
        name = (json.name?.toString() || name || '').trim() || name
        image = json.image
    }
    }

    items.push({
      mint: mint.toBase58(),
      seller: new PublicKey(data.seller).toBase58(),
      price: data.price.toString(),
      createdAt: Number(data.createdAt),
      isActive: data.isActive,
      image,
      name,
      symbol,
    })
  }

  items.sort((a, b) => b.createdAt - a.createdAt)
  if (limit) items = items.slice(0, limit)
  return items
}

export async function fetchListingForMint(mintStr: string) {
  const connection = new Connection(RPC_URL, 'processed')
  const programId = new PublicKey(PROGRAM_ID)
  const mint = new PublicKey(mintStr)

  const coder = getServerCoder()
  const [listingPda] = PublicKey.findProgramAddressSync([Buffer.from('listing'), mint.toBuffer()], programId)
  const acc = await connection.getAccountInfo(listingPda)
  if (!acc) return null

  // IMPORTANT: use PascalCase
  const data = coder.accounts.decode('Listing', acc.data) as any
  return {
    pda: listingPda.toBase58(),
    seller: new PublicKey(data.seller).toBase58(),
    mint: new PublicKey(data.mint).toBase58(),
    price: data.price.toString(),
    createdAt: Number(data.createdAt),
    isActive: data.isActive,
    bump: data.bump,
  }
}