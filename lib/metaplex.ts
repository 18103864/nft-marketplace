// lib/metaplex.ts
import { PublicKey, Connection } from '@solana/web3.js'
import { Metaplex } from '@metaplex-foundation/js'

function clean(s: unknown) {
  return String(s ?? '').replace(/\0/g, '').trim()
}

export async function fetchNftMetadata(connection: Connection, mint: PublicKey) {
  try {
    // Metaplex JS normalizes on-chain metadata (name/symbol/uri)
    // You can also use: const metaplex = Metaplex.make(connection)
    const metaplex = new Metaplex(connection)
    const nft = await metaplex.nfts().findByMint({ mintAddress: mint })

    const onChainName = clean((nft as any).name)
    const onChainSymbol = clean((nft as any).symbol)
    const onChainUri = clean((nft as any).uri)

    return {
      name: onChainName,
      symbol: onChainSymbol,
      uri: onChainUri,
      sellerFeeBasisPoints: undefined, // not required by UI
    }
  } catch {
    return null
  }
}

export async function fetchJson<T = any>(uri: string): Promise<T | null> {
  try {
    let u = uri.replace(/\0/g, '').trim()
    if (!u) return null
    if (u.startsWith('ipfs://')) u = u.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')
    const res = await fetch(u, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}