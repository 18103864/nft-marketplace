// app/api/pinata/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PINATA_JWT, PINATA_GATEWAY } from '@/lib/env'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    if (!PINATA_JWT) {
      return NextResponse.json({ error: 'Missing PINATA_JWT' }, { status: 500 })
    }
    const form = await req.formData()
    const file = form.get('file') as File | null
    const name = String(form.get('name') || '')
    const symbol = String(form.get('symbol') || '')
    const description = String(form.get('description') || '')
    const sellerFeeBasisPoints = Number(form.get('sellerFeeBasisPoints') || 0)

    if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    if (!name || !symbol) return NextResponse.json({ error: 'Missing name or symbol' }, { status: 400 })

    // 1) Upload file to Pinata
    const fileForm = new FormData()
    fileForm.append('file', file, (file as any).name || 'nft.png')
    const fileRes = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: { Authorization: `Bearer ${PINATA_JWT}` },
      body: fileForm,
    })
    if (!fileRes.ok) {
      const t = await fileRes.text()
      return NextResponse.json({ error: `Pin file failed: ${t}` }, { status: 500 })
    }
    const fileJson = await fileRes.json()
    const fileHash = fileJson.IpfsHash || fileJson.ipfsHash || fileJson.hash || fileJson.cid
    if (!fileHash) return NextResponse.json({ error: 'No IpfsHash in response' }, { status: 500 })

    const imageUri = `${PINATA_GATEWAY}/${fileHash}`

    // 2) Upload metadata JSON
    const metadata = {
      name,
      symbol,
      description,
      image: imageUri,
      attributes: [],
      properties: {
        files: [{ uri: imageUri, type: file.type || 'image/png' }],
        category: 'image',
      },
      seller_fee_basis_points: sellerFeeBasisPoints,
    }
    const metaRes = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    })
    if (!metaRes.ok) {
      const t = await metaRes.text()
      return NextResponse.json({ error: `Pin JSON failed: ${t}` }, { status: 500 })
    }
    const metaJson = await metaRes.json()
    const metaHash = metaJson.IpfsHash || metaJson.ipfsHash || metaJson.hash || metaJson.cid
    const metadataUri = `${PINATA_GATEWAY}/${metaHash}`

    return NextResponse.json({ imageUri, metadataUri })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 })
  }
}