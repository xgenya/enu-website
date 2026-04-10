// 排行榜 Mock 数据
// 实际数据应从 Plan API 获取

export type PlayerStats = {
  name: string
  playtime: number // 分钟
  joins: number
  deaths: number
  kills: number
  mobKills: number
  blocksPlaced: number
  blocksBroken: number
  afkTime: number // 分钟
  lastSeen: string // ISO date
}

export const PLAYERS: PlayerStats[] = [
  {
    name: 'Rem_0000',
    playtime: 12540,
    joins: 245,
    deaths: 42,
    kills: 18,
    mobKills: 1523,
    blocksPlaced: 45678,
    blocksBroken: 38901,
    afkTime: 1200,
    lastSeen: '2026-04-10',
  },
  {
    name: 'zhang1322',
    playtime: 8760,
    joins: 189,
    deaths: 67,
    kills: 12,
    mobKills: 892,
    blocksPlaced: 32145,
    blocksBroken: 28765,
    afkTime: 980,
    lastSeen: '2026-04-09',
  },
  {
    name: 'CreeperHunter',
    playtime: 6420,
    joins: 156,
    deaths: 23,
    kills: 45,
    mobKills: 2341,
    blocksPlaced: 18234,
    blocksBroken: 21456,
    afkTime: 540,
    lastSeen: '2026-04-10',
  },
  {
    name: 'DiamondMiner',
    playtime: 5890,
    joins: 134,
    deaths: 89,
    kills: 5,
    mobKills: 456,
    blocksPlaced: 67890,
    blocksBroken: 89012,
    afkTime: 320,
    lastSeen: '2026-04-08',
  },
  {
    name: 'BuilderPro',
    playtime: 4560,
    joins: 98,
    deaths: 15,
    kills: 2,
    mobKills: 234,
    blocksPlaced: 123456,
    blocksBroken: 12345,
    afkTime: 890,
    lastSeen: '2026-04-10',
  },
  {
    name: 'RedstoneKing',
    playtime: 3980,
    joins: 87,
    deaths: 34,
    kills: 8,
    mobKills: 567,
    blocksPlaced: 34567,
    blocksBroken: 23456,
    afkTime: 450,
    lastSeen: '2026-04-07',
  },
  {
    name: 'ExplorerX',
    playtime: 3450,
    joins: 234,
    deaths: 156,
    kills: 3,
    mobKills: 1234,
    blocksPlaced: 8901,
    blocksBroken: 15678,
    afkTime: 120,
    lastSeen: '2026-04-09',
  },
  {
    name: 'FarmMaster',
    playtime: 2890,
    joins: 67,
    deaths: 12,
    kills: 0,
    mobKills: 89,
    blocksPlaced: 45123,
    blocksBroken: 34567,
    afkTime: 670,
    lastSeen: '2026-04-06',
  },
  {
    name: 'NetherWalker',
    playtime: 2340,
    joins: 45,
    deaths: 234,
    kills: 67,
    mobKills: 3456,
    blocksPlaced: 5678,
    blocksBroken: 7890,
    afkTime: 230,
    lastSeen: '2026-04-05',
  },
  {
    name: 'SkyBuilder',
    playtime: 1890,
    joins: 56,
    deaths: 8,
    kills: 1,
    mobKills: 123,
    blocksPlaced: 78901,
    blocksBroken: 4567,
    afkTime: 340,
    lastSeen: '2026-04-04',
  },
]

export type LeaderboardType = {
  id: string
  title: string
  icon: string
  field: keyof PlayerStats
  format: (value: number) => string
  desc: string
}

export const LEADERBOARDS: LeaderboardType[] = [
  {
    id: 'playtime',
    title: '在线时长',
    icon: '⏱️',
    field: 'playtime',
    format: (v) => {
      const hours = Math.floor(v / 60)
      const mins = v % 60
      return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
    },
    desc: '累计在线游戏时间',
  },
  {
    id: 'joins',
    title: '登录次数',
    icon: '🚪',
    field: 'joins',
    format: (v) => `${v} 次`,
    desc: '进入服务器的总次数',
  },
  {
    id: 'mobKills',
    title: '怪物击杀',
    icon: '⚔️',
    field: 'mobKills',
    format: (v) => `${v} 只`,
    desc: '击杀怪物的总数量',
  },
  {
    id: 'blocksPlaced',
    title: '放置方块',
    icon: '🧱',
    field: 'blocksPlaced',
    format: (v) => v.toLocaleString(),
    desc: '放置方块的总数量',
  },
  {
    id: 'blocksBroken',
    title: '破坏方块',
    icon: '⛏️',
    field: 'blocksBroken',
    format: (v) => v.toLocaleString(),
    desc: '挖掘方块的总数量',
  },
  {
    id: 'deaths',
    title: '死亡次数',
    icon: '💀',
    field: 'deaths',
    format: (v) => `${v} 次`,
    desc: '累计死亡次数',
  },
  {
    id: 'kills',
    title: 'PVP 击杀',
    icon: '🗡️',
    field: 'kills',
    format: (v) => `${v} 次`,
    desc: '击杀其他玩家的次数',
  },
]
