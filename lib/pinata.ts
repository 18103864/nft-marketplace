// lib/pinata.ts
export async function createMintFileAndJson({
  file,
  name,
  symbol,
  description,
  sellerFeeBasisPoints,
}: {
  file: File
  name: string
  symbol: string
  description?: string
  sellerFeeBasisPoints: number
}) {
  const form = new FormData()
  form.append('file', file)
  form.append('name', name)
  form.append('symbol', symbol)
  form.append('sellerFeeBasisPoints', String(sellerFeeBasisPoints))
  if (description) form.append('description', description)

  const res = await fetch('/api/pinata', {
    method: 'POST',
    body: form,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Pinata upload failed: ${text}`)
  }
  return res.json() as Promise<{ imageUri: string; metadataUri: string }>
}