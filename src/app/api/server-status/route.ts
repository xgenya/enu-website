import { NextResponse } from 'next/server'

export const revalidate = 60 // cache for 60 seconds

export async function GET() {
  try {
    const res = await fetch('https://api.mcsrvstat.us/3/eunoia.ink', {
      next: { revalidate: 60 },
    })
    const data = await res.json()
    return NextResponse.json({
      online: data.online ?? false,
      players: data.players?.online ?? 0,
    })
  } catch {
    return NextResponse.json({ online: false, players: 0 })
  }
}
