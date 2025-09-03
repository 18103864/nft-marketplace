// components/wallet/ConnectWalletButton.tsx
'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ConnectWalletButton() {
  const { connected, connecting, publicKey, wallets, select, connect, disconnect } = useWallet()
  const [open, setOpen] = useState(false)

  const short = publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : ''

  if (connected) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-2 rounded border border-white/20 text-sm">{short}</div>
        <Button variant="secondary" onClick={() => disconnect()}>Disconnect</Button>
      </div>
    )
  }

  const connectByDisplayName = async (displayName: 'Phantom' | 'Solflare') => {
    try {
      const w = wallets.find((w) => w.adapter.name === displayName)
      if (!w) {
        console.warn(`Wallet ${displayName} not found in adapters`)
        return
      }
      // adapter.name is WalletName (branded), so this satisfies the type for select
      select(w.adapter.name)
      await connect()
      setOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="relative">
      <Button onClick={() => setOpen((o) => !o)} disabled={connecting}>
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded border border-white/10 bg-black/90 backdrop-blur p-2 space-y-2 z-50">
          <button
            className="w-full text-left px-3 py-2 rounded hover:bg-white/10"
            onClick={() => connectByDisplayName('Phantom')}
          >
            Connect Phantom
          </button>
          <button
            className="w-full text-left px-3 py-2 rounded hover:bg-white/10"
            onClick={() => connectByDisplayName('Solflare')}
          >
            Connect Solflare
          </button>
        </div>
      )}
    </div>
  )
}