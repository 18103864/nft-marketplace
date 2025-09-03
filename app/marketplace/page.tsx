// app/marketplace/page.tsx
import ListingsServer from '@/components/listings/listings-server'

export const dynamic = 'force-dynamic'

export default async function MarketplacePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Marketplace</h1>
      <ListingsServer />
    </div>
  )
}