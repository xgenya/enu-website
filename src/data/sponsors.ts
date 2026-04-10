// 赞助记录
// name: MC用户名（用于显示头像）
// amount: 赞助金额
// date: 日期 (YYYY-MM 格式)

export const SPONSORS = [
  { name: 'zhang1322', amount: 100, date: '2026-03' },
]

// 支出记录
// item: 支出项目名称
// amount: 金额
// date: 日期 (YYYY-MM 格式)
// recurring: 是否为每月固定支出

export const EXPENSES = [
  { item: '服务器月租', amount: 800, date: '2026-04', recurring: true },
]

// 服务器配置
export const SERVER_CONFIG = {
  cpu: 'AMD EPYC™ 9454P',
  ram: '16GB DDR5 ECC',
  storage: 'NVMe SSD',
  network: '100 Mbps',
}
