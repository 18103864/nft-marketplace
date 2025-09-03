// components/listings/listings-server.tsx
import { fetchActiveListings } from '@/lib/rpc'
import ListingsClient from './listings-clients'

export default async function ListingsServer({ limit }: { limit?: number }) {
  try {
    const listings = await fetchActiveListings({ limit })
    return <ListingsClient initialListings={listings} />
  } catch (e) {
    // Graceful SSR fallback (no crash)
    console.error('Failed to fetch listings:', e)
    return (
      <div className="rounded border border-white/10 p-4">
        <p className="text-white/70">Unable to load marketplace listings right now.</p>
      </div>
    )
  }
}