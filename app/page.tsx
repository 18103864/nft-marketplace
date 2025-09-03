// app/page.tsx
import ListingsServer from '@/components/listings/listings-server'

export default async function HomePage() {
  // Show latest listings (limit 8)
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Discover, Mint, and Trade NFTs on Solana</h1>
        <p className="text-white/70">Powered by your on-chain Anchor program and Metaplex metadata.</p>
        <div className="flex gap-3 justify-center">
          <a href="/create" className="px-4 py-2 rounded bg-white text-black font-medium">Create NFT</a>
          <a href="/marketplace" className="px-4 py-2 rounded border border-white/20">Explore Marketplace</a>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Latest Listings</h2>
        <ListingsServer limit={8} />
      </section>
    </div>
  )
}