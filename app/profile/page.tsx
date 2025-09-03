// app/profile/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getOwnedNftsWithMetadata, getListingForMint, initializeMarketplace, createListing, cancelListing, updateListingPrice } from '@/lib/actions'
import { lamportsToSol, solToLamports } from '@/lib/utils'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

type OwnedNft = {
  mint: string
  name?: string
  image?: string
  symbol?: string
  uri?: string
}

export default function ProfilePage() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [nfts, setNfts] = useState<OwnedNft[]>([])
  const [loading, setLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(false)
  const [listPrice, setListPrice] = useState<string>('0.1')
  const [listActionLoading, setListActionLoading] = useState<string>('') // mint being acted on
  const [marketFee, setMarketFee] = useState<string>('250') // 2.5% default (bps)

  const pubkey = wallet.publicKey?.toBase58()

  useEffect(() => {
    const run = async () => {
      if (!wallet.publicKey) {
        setNfts([])
        return
      }
      setLoading(true)
      try {
        const items = await getOwnedNftsWithMetadata(connection, wallet.publicKey)
        setNfts(items)
      } catch (e) {
        console.error(e)
        toast.error('Failed to load NFTs')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [connection, wallet.publicKey])

  const onInitMarketplace = async () => {
    if (!wallet.connected) return
    try {
      setInitLoading(true)
      const sig = await initializeMarketplace({ connection, wallet, feePercent: BigInt(marketFee) })
      toast.success(`Marketplace initialized. Tx: ${sig}`)
    } catch (e: any) {
      console.error(e)
      toast.error(e.message || 'Failed to initialize marketplace')
    } finally {
      setInitLoading(false)
    }
  }

  const onList = async (mint: string) => {
    if (!wallet.connected) return
    try {
      setListActionLoading(mint)
      const lamports = solToLamports(Number(listPrice))
      const sig = await createListing({ connection, wallet, mint, priceLamports: lamports })
      toast.success(`Listed. Tx: ${sig}`)
    } catch (e: any) {
      console.error(e)
      toast.error(e.message || 'Failed to list NFT')
    } finally {
      setListActionLoading('')
    }
  }

  const onCancel = async (mint: string) => {
    if (!wallet.connected) return
    try {
      setListActionLoading(mint)
      const sig = await cancelListing({ connection, wallet, mint })
      toast.success(`Listing cancelled. Tx: ${sig}`)
    } catch (e: any) {
      console.error(e)
      toast.error(e.message || 'Failed to cancel listing')
    } finally {
      setListActionLoading('')
    }
  }

  const onUpdatePrice = async (mint: string) => {
    if (!wallet.connected) return
    try {
      setListActionLoading(mint)
      const lamports = solToLamports(Number(listPrice))
      const sig = await updateListingPrice({ connection, wallet, mint, newPriceLamports: lamports })
      toast.success(`Price updated. Tx: ${sig}`)
    } catch (e: any) {
      console.error(e)
      toast.error(e.message || 'Failed to update price')
    } finally {
      setListActionLoading('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>

      {!wallet.connected ? (
        <p className="text-white/70">Connect your wallet to see your NFTs.</p>
      ) : (
        <>
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Marketplace Admin</h2>
            <div className="flex items-center gap-2">
              <input
                className="w-40 rounded border border-white/20 bg-transparent px-3 py-2"
                type="number"
                value={marketFee}
                onChange={(e) => setMarketFee(e.target.value)}
                placeholder="Fee (bps)"
              />
              <Button onClick={onInitMarketplace} disabled={initLoading}>
                {initLoading ? 'Initializing...' : 'Initialize Marketplace'}
              </Button>
              <p className="text-sm text-white/60">Authority will be your wallet; fee in basis points.</p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-white/70">Listing Price (SOL)</label>
              <input
                className="w-40 rounded border border-white/20 bg-transparent px-3 py-2"
                value={listPrice}
                onChange={(e) => setListPrice(e.target.value)}
              />
            </div>
            {loading ? (
              <p>Loading NFTs...</p>
            ) : nfts.length === 0 ? (
              <p className="text-white/70">No NFTs found for {pubkey}.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {nfts.map((n) => (
                  <OwnedNftCard
                    key={n.mint}
                    nft={n}
                    onList={onList}
                    onCancel={onCancel}
                    onUpdatePrice={onUpdatePrice}
                    loadingMint={listActionLoading}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}

function OwnedNftCard({
  nft,
  onList,
  onCancel,
  onUpdatePrice,
  loadingMint,
}: {
  nft: { mint: string; name?: string; image?: string; symbol?: string; uri?: string }
  onList: (mint: string) => void
  onCancel: (mint: string) => void
  onUpdatePrice: (mint: string) => void
  loadingMint: string
}) {
  const [listed, setListed] = useState<boolean | null>(null)
  const [price, setPrice] = useState<string>('')

  useEffect(() => {
    const run = async () => {
      try {
        const listing = await getListingForMint(nft.mint)
        if (listing && listing.isActive) {
          setListed(true)
          setPrice(lamportsToSol(Number(listing.price)).toString())
        } else {
          setListed(false)
        }
      } catch {
        setListed(false)
      }
    }
    run()
  }, [nft.mint])

  const loading = loadingMint === nft.mint

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden">
      {nft.image ? (
        <img src={nft.image} alt={nft.name || nft.mint} className="w-full h-48 object-cover bg-white/5" />
      ) : (
        <div className="w-full h-48 bg-white/5" />
      )}
      <div className="p-4 space-y-2">
        <div className="font-semibold">{nft.name || 'Untitled'}</div>
        <div className="text-xs text-white/50 break-all">{nft.mint}</div>

        {listed === null ? (
          <div className="text-white/70 text-sm">Loading listing...</div>
        ) : listed ? (
          <div className="space-y-2">
            <div className="text-sm">Listed at {price} SOL</div>
            <div className="flex gap-2">
              <Button onClick={() => onCancel(nft.mint)} disabled={loading}>
                {loading ? '...' : 'Cancel Listing'}
              </Button>
              <Button onClick={() => onUpdatePrice(nft.mint)} disabled={loading} variant="secondary">
                {loading ? '...' : 'Update Price'}
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => onList(nft.mint)} disabled={loading}>
            {loading ? '...' : 'List for Sale'}
          </Button>
        )}
      </div>
    </div>
  )
}