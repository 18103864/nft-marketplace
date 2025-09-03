// components/listings/listings-client.tsx
'use client'

import { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { buyNft } from '@/lib/actions'
import { lamportsToSol } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type ListingItem = {
  mint: string
  seller: string
  price: string // lamports as string
  createdAt: number
  isActive: boolean
  image?: string
  name?: string
  symbol?: string
}

export default function ListingsClient({ initialListings }: { initialListings: ListingItem[] }) {
  const [listings, setListings] = useState(initialListings)
  const [loadingMint, setLoadingMint] = useState<string>('')
  const { connection } = useConnection()
  const wallet = useWallet()

  const onBuy = async (mint: string) => {
    if (!wallet.connected) return toast.error('Connect wallet first.')
    try {
      setLoadingMint(mint)
      const sig = await buyNft({ connection, wallet, mint })
      toast.success(`Purchase successful. Tx: ${sig}`)
      setListings((prev) => prev.filter((l) => l.mint !== mint)) // remove from active
    } catch (e: any) {
      console.error(e)
      toast.error(e.message || 'Failed to buy NFT')
    } finally {
      setLoadingMint('')
    }
  }

  if (listings.length === 0) {
    return <p className="text-white/70">No active listings found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {listings.map((l) => (
        <div key={l.mint} className="rounded-lg border border-white/10 overflow-hidden">
          {l.image ? (
            <img src={l.image} alt={l.name || l.mint} className="w-full h-48 object-cover bg-white/5" />
          ) : (
            <div className="w-full h-48 bg-white/5" />
          )}
          <div className="p-4 space-y-2">
            <div className="font-semibold">{l.name || 'Untitled'}</div>
            <div className="text-sm text-white/60">{lamportsToSol(Number(l.price))} SOL</div>
            <div className="text-xs text-white/40 break-all">Mint: {l.mint}</div>
            <Button onClick={() => onBuy(l.mint)} disabled={loadingMint === l.mint}>
              {loadingMint === l.mint ? 'Buying...' : 'Buy'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}