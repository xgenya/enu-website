import { NextResponse } from 'next/server'
import { fetchServerInfo } from 'minestat-es'

export const revalidate = 60

const SERVERS = {
  survival: { host: 'eunoia.ink', port: 24871 },
  creative: { host: 'eunoia.ink', port: 25565 },
}

async function queryServer(host: string, port: number, full = false) {
  try {
    const result = await fetchServerInfo({ 
      address: host, 
      port, 
      timeout: 5000, 
      ping: true,
    })
    if (full) {
      return result
    }
    return {
      online: result.online,
      players: result.players ?? 0,
      maxPlayers: result.maxPlayers ?? 0,
      version: result.version,
      motd: result.motd,
      pingMs: result.pingMs,
      playerInfo: result.playerInfo,
    }
  } catch (e) {
    return { online: false, players: 0, maxPlayers: 0, error: String(e) }
  }
}

export async function GET_FULL(request: Request) {
  const { searchParams } = new URL(request.url)
  const server = searchParams.get('server') as keyof typeof SERVERS | null
  
  if (server && server in SERVERS) {
    const { host, port } = SERVERS[server]
    const status = await queryServer(host, port, true)
    return NextResponse.json(status)
  }
  return NextResponse.json({ error: 'specify ?server=survival or ?server=creative' })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const server = searchParams.get('server')

  if (server && server in SERVERS) {
    const { host, port } = SERVERS[server as keyof typeof SERVERS]
    const status = await queryServer(host, port)
    return NextResponse.json(status)
  }

  const [survival, creative] = await Promise.all([
    queryServer(SERVERS.survival.host, SERVERS.survival.port),
    queryServer(SERVERS.creative.host, SERVERS.creative.port),
  ])

  return NextResponse.json({
    survival,
    creative,
    totalPlayers: (survival.players ?? 0) + (creative.players ?? 0),
    anyOnline: survival.online || creative.online,
  })
}
