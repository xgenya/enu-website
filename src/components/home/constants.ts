export const FEATURES = [
  {
    icon: '/images/mc-icons/redstone_block.png',
    title: '性能拉满，畅快无阻',
    desc: '搭载 EPYC™ 高性能处理器，全天候稳定 20TPS。无论是复杂红石装置还是远征未知大陆，丝滑体验始终如一',
  },
  {
    icon: '/images/mc-icons/crafting_table_top.png',
    title: '原版内核，恰到好处',
    desc: '坚守原版生存的纯粹体验，不做多余的堆砌。少量自研插件只在关键处画龙点睛，让每一次游玩都有恰到好处的新鲜感',
  },
  {
    icon: '/images/mc-icons/repeater.png',
    title: '为红石留足空间',
    desc: '完善的红石基础设施，保留原版特性不做阉割。无论多复杂的装置，都能稳定运行、如你所愿',
  },
  {
    icon: '/images/mc-icons/torch.png',
    title: '好的氛围，自然生长',
    desc: '不立太多规矩，不搞形式主义。老玩家带新玩家，互帮互助自然而然。这里没有戾气，只有一群同样热爱这个世界的人',
  },
]

export const GALLERY = [
  { src: '/images/gallery/screenshot-1.png', alt: 'Gallery screenshot 1' },
  { src: '/images/gallery/screenshot-2.png', alt: 'Gallery screenshot 2' },
  { src: '/images/gallery/screenshot-3.png', alt: 'Gallery screenshot 3' },
]

export const PARTICLES = [
  { left: '8%',  delay: '0s',   duration: '12s', size: 3 },
  { left: '20%', delay: '2.4s', duration: '9s',  size: 2 },
  { left: '35%', delay: '5s',   duration: '14s', size: 4 },
  { left: '50%', delay: '1.2s', duration: '11s', size: 2 },
  { left: '63%', delay: '7s',   duration: '10s', size: 3 },
  { left: '78%', delay: '3.6s', duration: '13s', size: 2 },
  { left: '90%', delay: '0.8s', duration: '15s', size: 3 },
  { left: '14%', delay: '9s',   duration: '10s', size: 2 },
  { left: '44%', delay: '4.3s', duration: '12s', size: 4 },
  { left: '72%', delay: '6s',   duration: '8s',  size: 2 },
]

export const TYPING_PHRASES = [
  '一个纯粹的原版生存服务器',
  'A Pure Vanilla Survival Server',
  '红石 · 建筑 · 探索',
  'Redstone · Building · Exploration',
]

export const TEAM_MEMBERS = [
  {
    username: 'zhang1322',
    name: 'zhang1322',
    role: '服务器创始人',
    tag: 'FOUNDER',
    color: '#f0c060',
  },
  {
    username: 'sixihappy',
    name: 'sixihappy',
    role: '核心管理',
    tag: 'ADMIN',
    color: '#5db85d',
  },
  {
    username: 'remrinya',
    name: 'remrinya',
    role: '开发团队',
    tag: 'DEV',
    color: '#7090e0',
  },
]

export type TeamMember = typeof TEAM_MEMBERS[number]

export type ServerStatus = {
  online: boolean
  players: number
  maxPlayers: number
  pingMs?: number
}

export const SERVER_START_DATE = new Date('2026-03-12')
