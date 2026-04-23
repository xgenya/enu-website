import financeConfig from '../../config/finance'
import hwConfig from '../../config/hardware'

export type Sponsor = { name: string; amount: number; date: string }
export type Expense = { item: string; amount: number; date: string; recurring: boolean }

export const SPONSORS: Sponsor[] = financeConfig.sponsors
export const EXPENSES: Expense[] = financeConfig.expenses
export const SERVER_CONFIG = hwConfig.serverConfig
