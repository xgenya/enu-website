'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import styles from './status.module.css'
import Navbar from './Navbar'
import { SPONSORS, EXPENSES, SERVER_CONFIG } from '../data/sponsors'

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [hasStarted, target, duration])

  return { value, ref }
}

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const { value: animatedValue, ref } = useCountUp(Math.abs(value))
  const sign = value < 0 ? '-' : (value > 0 && prefix === '+' ? '+' : '')
  return <span ref={ref}>{sign}¥{animatedValue}{suffix}</span>
}

const PARTICLES = [
  { left: '8%',  delay: '0s',   duration: '12s', size: 3 },
  { left: '20%', delay: '2.4s', duration: '9s',  size: 2 },
  { left: '35%', delay: '5s',   duration: '14s', size: 4 },
  { left: '50%', delay: '1.2s', duration: '11s', size: 2 },
  { left: '63%', delay: '7s',   duration: '10s', size: 3 },
  { left: '78%', delay: '3.6s', duration: '13s', size: 2 },
  { left: '90%', delay: '0.8s', duration: '15s', size: 3 },
]

type MonthlyData = {
  month: string
  income: number
  expense: number
}

function MonthlyChart({ data }: { data: MonthlyData[] }) {
  const maxValue = Math.max(...data.flatMap(d => [d.income, d.expense]), 1)
  
  return (
    <div className={styles.chart}>
      <div className={styles.chartBars}>
        {data.map((d, i) => (
          <div key={i} className={styles.chartGroup}>
            <div className={styles.chartBarWrap}>
              <div 
                className={`${styles.chartBar} ${styles.chartBarIncome}`}
                style={{ height: `${(d.income / maxValue) * 100}%` }}
                title={`收入: ¥${d.income}`}
              />
              <div 
                className={`${styles.chartBar} ${styles.chartBarExpense}`}
                style={{ height: `${(d.expense / maxValue) * 100}%` }}
                title={`支出: ¥${d.expense}`}
              />
            </div>
            <span className={styles.chartLabel}>{d.month}</span>
          </div>
        ))}
      </div>
      <div className={styles.chartLegend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendIncome}`} />
          收入
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendExpense}`} />
          支出
        </span>
      </div>
    </div>
  )
}

export default function StatusPage() {
  const totalIncome = SPONSORS.reduce((sum, s) => sum + s.amount, 0)
  const totalExpense = EXPENSES.reduce((sum, e) => sum + e.amount, 0)
  const balance = totalIncome - totalExpense

  // 计算赞助排行榜（按总赞助金额排序）
  const sponsorRanking = useMemo(() => {
    const map = new Map<string, number>()
    SPONSORS.forEach(s => {
      map.set(s.name, (map.get(s.name) || 0) + s.amount)
    })
    return Array.from(map.entries())
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
  }, [])

  // 计算每月收支数据
  const monthlyData = useMemo(() => {
    const months = new Set<string>()
    SPONSORS.forEach(s => months.add(s.date))
    EXPENSES.forEach(e => months.add(e.date))
    
    const sortedMonths = Array.from(months).sort()
    
    return sortedMonths.map(month => {
      const income = SPONSORS.filter(s => s.date === month).reduce((sum, s) => sum + s.amount, 0)
      const expense = EXPENSES.filter(e => e.date === month).reduce((sum, e) => sum + e.amount, 0)
      const shortMonth = month.slice(5) // 只取月份部分
      return { month: shortMonth, income, expense }
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.particles} aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <Navbar />

      <main className={styles.page}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>TRANSPARENCY</span>
          <h1 className={styles.title}>运营状态公示</h1>
          <p className={styles.subtitle}>
            服务器运营信息公开透明，感谢每一位支持者
          </p>
        </header>

        {/* Sponsor Ranking */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>赞助排行榜</h2>
            <span className={styles.sectionSub}>累计赞助金额</span>
          </div>
          {sponsorRanking.length > 0 ? (
            <div className={styles.rankingList}>
              {sponsorRanking.map((s, i) => (
                <div key={s.name} className={`${styles.rankingItem} ${i < 3 ? styles[`rank${i + 1}`] : ''}`}>
                  <span className={styles.rankingPos}>
                    {i < 3 ? (
                      <span className={styles.rankingMedal}>{['🥇', '🥈', '🥉'][i]}</span>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <img 
                    src={`https://mc-heads.net/avatar/${s.name}/40`} 
                    alt={s.name}
                    className={styles.rankingAvatar}
                  />
                  <span className={styles.rankingName}>{s.name}</span>
                  <span className={styles.rankingAmount}>¥{s.total}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>暂无赞助记录</div>
          )}
        </section>

        {/* Sponsors */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>赞助记录</h2>
            <span className={styles.sectionSub}>感谢各位的支持</span>
          </div>
          {SPONSORS.length > 0 ? (
            <div className={styles.sponsorList}>
              {SPONSORS.map((s, i) => (
                <div key={i} className={styles.sponsorItem}>
                  <img 
                    src={`https://mc-heads.net/avatar/${s.name}/48`} 
                    alt={s.name}
                    className={styles.sponsorAvatar}
                  />
                  <div className={styles.sponsorInfo}>
                    <span className={styles.sponsorName}>{s.name}</span>
                    <span className={styles.sponsorDate}>{s.date}</span>
                  </div>
                  <span className={styles.sponsorAmount}>¥{s.amount}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>暂无赞助记录</div>
          )}
        </section>

        {/* Server Config */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>服务器配置</h2>
            <span className={styles.statusBadge}>
              <span className={styles.statusDot} />
              运行中
            </span>
          </div>
          <div className={styles.configGrid}>
            <div className={styles.configCard}>
              <div className={styles.configIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                  <rect x="8" y="8" width="8" height="8" rx="1"/>
                  <path d="M12 2v2M17 2v2M7 2v2M12 20v2M17 20v2M7 20v2M2 12h2M2 17h2M2 7h2M20 12h2M20 17h2M20 7h2"/>
                </svg>
              </div>
              <div className={styles.configContent}>
                <span className={styles.configLabel}>CPU 处理器</span>
                <span className={styles.configValue}>{SERVER_CONFIG.cpu}</span>
              </div>
            </div>
            <div className={styles.configCard}>
              <div className={styles.configIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="8" width="20" height="10" rx="2"/>
                  <path d="M6 8V6M10 8V6M14 8V6M18 8V6M6 18v1M10 18v1M14 18v1M18 18v1"/>
                </svg>
              </div>
              <div className={styles.configContent}>
                <span className={styles.configLabel}>RAM 内存</span>
                <span className={styles.configValue}>{SERVER_CONFIG.ram}</span>
              </div>
            </div>
            <div className={styles.configCard}>
              <div className={styles.configIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <circle cx="17" cy="12" r="2"/>
                  <path d="M2 12h10M6 9h4M6 15h4"/>
                </svg>
              </div>
              <div className={styles.configContent}>
                <span className={styles.configLabel}>Storage 存储</span>
                <span className={styles.configValue}>{SERVER_CONFIG.storage}</span>
              </div>
            </div>
            <div className={styles.configCard}>
              <div className={styles.configIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 19h.01M8.5 16.5a5 5 0 0 1 7 0M5 13a9 9 0 0 1 14 0M2 9.5a13 13 0 0 1 20 0"/>
                </svg>
              </div>
              <div className={styles.configContent}>
                <span className={styles.configLabel}>Network 网络</span>
                <span className={styles.configValue}>{SERVER_CONFIG.network}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Expenses */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>支出明细</h2>
          </div>
          {EXPENSES.length > 0 ? (
            <div className={styles.expenseList}>
              {EXPENSES.map((e, i) => (
                <div key={i} className={styles.expenseItem}>
                  <div className={styles.expenseInfo}>
                    <span className={styles.expenseName}>{e.item}</span>
                    {e.recurring && <span className={styles.expenseTag}>每月</span>}
                  </div>
                  <span className={styles.expenseDate}>{e.date}</span>
                  <span className={styles.expenseAmount}>-¥{e.amount}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>暂无支出记录</div>
          )}
        </section>

        {/* Financial */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>运营财务公示</h2>
            <span className={styles.sectionSub}>每月定期公示</span>
          </div>
          <div className={styles.financeGrid}>
            <div className={styles.financeCard}>
              <span className={styles.financeLabel}>总收入</span>
              <span className={styles.financeValue}>
                <AnimatedNumber value={totalIncome} />
              </span>
              <span className={styles.financeSub}>累计玩家赞助</span>
            </div>
            <div className={styles.financeCard}>
              <span className={styles.financeLabel}>总支出</span>
              <span className={styles.financeValue}>
                <AnimatedNumber value={totalExpense} />
              </span>
              <span className={styles.financeSub}>累计运营成本</span>
            </div>
            <div className={`${styles.financeCard} ${styles.financeBalance}`}>
              <span className={styles.financeLabel}>收支差额</span>
              <span className={`${styles.financeValue} ${balance >= 0 ? styles.positive : styles.negative}`}>
                <AnimatedNumber value={balance} prefix="+" />
              </span>
              <span className={styles.financeSub}>{balance >= 0 ? '盈余' : '亏损'}</span>
            </div>
          </div>
        </section>

        {/* Monthly Chart */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>每月收支趋势</h2>
          </div>
          {monthlyData.length > 0 ? (
            <MonthlyChart data={monthlyData} />
          ) : (
            <div className={styles.emptyState}>暂无数据</div>
          )}
        </section>

        {/* Sponsor Notice */}
        <section className={styles.noticeSection}>
          <h3 className={styles.noticeTitle}>关于赞助</h3>
          <ul className={styles.noticeList}>
            <li>赞助完全出于自愿，我们不会主动索取任何费用</li>
            <li>赞助不会获得任何游戏内特权或物品回报</li>
            <li>所有赞助资金将 100% 用于服务器运营与发展</li>
            <li>我们承诺定期公开财务收支，接受玩家监督</li>
          </ul>
          <p className={styles.noticeText}>
            感谢每一位愿意支持 ENU 的玩家，你们的支持是服务器持续运营的动力。
          </p>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <p className={styles.ctaText}>想要支持服务器运营？</p>
          <p className={styles.ctaDesc}>联系管理员了解赞助方式</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footerLogo}>ENU</span>
        <p className={styles.footerText}>© 2026 ENU Server · All rights reserved</p>
      </footer>
    </div>
  )
}
