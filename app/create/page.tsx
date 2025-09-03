// app/create/page.tsx
'use client'

import { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'sonner'
import { createNft } from '@/lib/actions'
import { Button } from '@/components/ui/button'

export default function CreatePage() {
  const { connection } = useConnection()
  const wallet = useWallet()

  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [description, setDescription] = useState('')
  const [royalty, setRoyalty] = useState(500) // 5.00% = 500 bps
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wallet.connected) return toast.error('Connect wallet first.')
    if (!file) return toast.error('Select an image file.')
    try {
      setLoading(true)
      const sig = await createNft({
        connection,
        wallet,
        name,
        symbol,
        description,
        sellerFeeBasisPoints: Number(royalty),
        file,
      })
      toast.success(`Minted! Tx: ${sig}`)
      setName('')
      setSymbol('')
      setDescription('')
      setRoyalty(500)
      setFile(null)
    } catch (e: any) {
      console.error(e)
      toast.error(e.message || 'Failed to mint NFT')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create / Mint NFT</h1>
      </div>

      {!wallet.connected ? (
        <p className="text-white/70">Connect your wallet to mint an NFT.</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
          <div className="space-y-1">
            <label className="block text-sm text-white/70">Name</label>
            <input
              className="w-full rounded border border-white/20 bg-transparent px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Cool NFT"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm text-white/70">Symbol</label>
            <input
              className="w-full rounded border border-white/20 bg-transparent px-3 py-2"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="COOL"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm text-white/70">Description</label>
            <textarea
              className="w-full rounded border border-white/20 bg-transparent px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your NFT"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm text-white/70">Royalty (basis points)</label>
            <input
              type="number"
              className="w-full rounded border border-white/20 bg-transparent px-3 py-2"
              value={royalty}
              onChange={(e) => setRoyalty(Math.max(0, Math.min(10000, Number(e.target.value))))}
              placeholder="e.g. 500 = 5%"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm text-white/70">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block"
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Minting...' : 'Mint NFT'}
          </Button>
        </form>
      )}
    </div>
  )
}