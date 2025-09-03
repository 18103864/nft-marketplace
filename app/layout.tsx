// app/layout.tsx
import './globals.css'
import { PropsWithChildren } from 'react'
import { Providers } from '@/components/providers'
import { ConnectWalletButton } from '@/components/wallet/ConnectWalletButton'

export const metadata = {
  title: 'NFT Marketplace',
  description: 'Solana NFT marketplace',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen bg-black text-white">
            <header className="border-b border-white/10">
              <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
                <a href="/" className="font-semibold">NFT Marketplace</a>
                <nav className="flex items-center gap-4">
                  <a href="/marketplace" className="hover:underline">Marketplace</a>
                  <a href="/create" className="hover:underline">Create</a>
                  <a href="/profile" className="hover:underline">Profile</a>
                  <ConnectWalletButton />
                </nav>
              </div>
            </header>
            <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}