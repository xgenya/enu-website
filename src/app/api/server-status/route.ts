import { NextResponse } from 'next/server'
import { fetchServerInfo } from 'minestat-es'
import homeConfig from '../../../../config/home'

export const revalidate = 60

const SERVERS = Object.fromEntries(
  homeConfig.servers.map(s => [s.id, { host: s.host, port: s.port }])
)

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const serverId = searchParams.get('server')

  if (serverId && serverId in SERVERS) {
    const { host, port } = SERVERS[serverId]
    const status = await queryServer(host, port)
    return NextResponse.json(status)
  }

  const results = await Promise.all(
    homeConfig.servers.map(s =>
      queryServer(s.host, s.port).then(status => [s.id, status] as const)
    )
  )
  const statusMap = Object.fromEntries(results)
  const totalPlayers = Object.values(statusMap).reduce((sum, s) => sum + (s.players ?? 0), 0)
  const anyOnline = Object.values(statusMap).some(s => s.online)

  return NextResponse.json({ ...statusMap, totalPlayers, anyOnline })
}
