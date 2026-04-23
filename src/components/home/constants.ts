import homeConfig from '../../../config/home'
import teamConfig from '../../../config/team'

export const FEATURES = homeConfig.features
export const GALLERY = homeConfig.gallery
export const TYPING_PHRASES = homeConfig.typingPhrases

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

export type ServerStatus = {
  online: boolean
  players: number
  maxPlayers: number
  pingMs?: number
}

export const SERVER_START_DATE = new Date(homeConfig.startDate)

export type TeamMember = {
  username: string
  name: string
  role: string
  tag: string
  color: string
}

export const TEAM_MEMBERS: TeamMember[] = teamConfig.team
