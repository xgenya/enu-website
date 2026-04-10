'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import styles from './home.module.css'

const FEATURES = [
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

const GALLERY = [
  { src: '/images/gallery/screenshot-1.png', alt: 'Gallery screenshot 1' },
  { src: '/images/gallery/screenshot-2.png', alt: 'Gallery screenshot 2' },
  { src: '/images/gallery/screenshot-3.png', alt: 'Gallery screenshot 3' },
]

const PARTICLES = [
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

const TYPING_PHRASES = [
  '一个原版Minecraft服务器。',
  '红石。',
  '建筑。',
  '摸鱼。',
]

function useHeroTyping() {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx]

    const schedule = (fn: () => void, delay: number) => {
      timer.current = setTimeout(fn, delay)
    }

    if (phase === 'typing') {
      if (charIdx < phrase.length) {
        schedule(() => {
          setDisplayed(phrase.slice(0, charIdx + 1))
          setCharIdx((c) => c + 1)
        }, 80)
      } else {
        schedule(() => setPhase('pause'), 1800)
      }
    } else if (phase === 'pause') {
      schedule(() => setPhase('erasing'), 0)
    } else {
      if (charIdx > 0) {
        schedule(() => {
          setDisplayed(phrase.slice(0, charIdx - 1))
          setCharIdx((c) => c - 1)
        }, 40)
      } else {
        schedule(() => {
          setPhraseIdx((i) => (i + 1) % TYPING_PHRASES.length)
          setPhase('typing')
        }, 300)
      }
    }

    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [phase, charIdx, phraseIdx])

  return { displayed, phase }
}

export default function MCHomePage() {
  const [players, setPlayers] = useState<string>('--')
  const [serverOnline, setServerOnline] = useState(true)
  const { displayed, phase } = useHeroTyping()

  useEffect(() => {
    fetch('/api/server-status')
      .then((r) => r.json())
      .then((d) => {
        setPlayers(String(d.players))
        setServerOnline(d.online)
      })
      .catch(() => {})
  }, [])
  return (
    <div className={styles.container}>

      {/* ── Navbar ── */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>ENU</Link>
        <ul className={styles.navLinks}>
          <li><Link href="/docs" className={styles.navLink}>文档</Link></li>
          <li><Link href="/about" className={styles.navLink}>关于</Link></li>
          <li><Link href="/getting-started" className={styles.navLink}>快速开始</Link></li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.particles} aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className={styles.particle}
              style={{
                left: p.left,
                bottom: '-10px',
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        <div className={styles.systemStatus}>
          <span className={styles.statusDot} style={{ background: serverOnline ? undefined : '#e05555' }} />
          {serverOnline ? 'SERVER ONLINE' : 'SERVER OFFLINE'}
        </div>
        <p className={styles.serverTag}>ENU SERVER</p>
        <h1 className={styles.heroTitle}>ENU</h1>
        <div className={styles.heroTyping} aria-live="polite">
          <span className={styles.heroTypingText}>{displayed}</span>
          <span className={`${styles.heroTypingCursor} ${phase === 'pause' ? styles.heroTypingCursorBlink : ''}`} aria-hidden="true" />
        </div>
        <p className={styles.heroSubtitle}>给热爱方块的人，一个落脚的地方</p>
        <p className={styles.heroDesc}>每段冒险都值得被认真对待，而你的篇章从这里翻开</p>

        <div className={styles.heroBtnGroup}>
          <Link href="/getting-started" className={styles.btnPrimary}>开始你的冒险</Link>
          <Link href="/docs" className={styles.btnSecondary}>了解更多</Link>
        </div>

        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{players}</span>
            <span className={styles.statLabel}>Online Players</span>
            <span className={styles.statLabelSub}>在线玩家</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>2</span>
            <span className={styles.statLabel}>Season</span>
            <span className={styles.statLabelSub}>周目</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Days Running</span>
            <span className={styles.statLabelSub}>运行天数</span>
          </div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>SCROLL</span>
          <span className={styles.scrollArrow} />
        </div>
      </section>

      <div className={styles.grassDivider} aria-hidden="true" />
      <div className={styles.dirtDivider} aria-hidden="true" />

      {/* ── Why ENU ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>WHY ENU</span>
          <h2 className={styles.sectionTitle}>在这里<em>安心生存</em></h2>
          <p className={styles.sectionSubtitle}>
            用心打磨每一个细节，只为让你在方块世界里，找到一份踏实与安心。
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <img src={f.icon} alt={f.title} className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dirtDivider} aria-hidden="true" />
      <div className={styles.grassDivider} aria-hidden="true" />

      {/* ── Hardware ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>INFRASTRUCTURE</span>
          <h2 className={styles.sectionTitle}>为稳定<em>全力以赴</em></h2>
          <p className={styles.sectionSubtitle}>
            工业级服务器硬件，专为 Minecraft 高负载场景深度调优
          </p>
        </div>

        {/* Chip Animation */}
        <div className={styles.chipWrap}>
          {/* Concentric rings */}
          <div className={`${styles.chipRing} ${styles.chipRing1}`}>
            <span className={styles.chipRingDot} />
          </div>
          <div className={`${styles.chipRing} ${styles.chipRing2}`}>
            <span className={`${styles.chipRingDot} ${styles.chipRingDot2}`} />
          </div>
          <div className={`${styles.chipRing} ${styles.chipRing3}`}>
            <span className={`${styles.chipRingDot} ${styles.chipRingDot3}`} />
          </div>

          {/* CPU chip */}
          <div className={styles.chipBox}>
            <div className={styles.chipInner}>
              {/* Pins top */}
              <div className={`${styles.chipPins} ${styles.chipPinsTop}`}>
                {[...Array(6)].map((_, i) => <span key={i} className={styles.chipPin} />)}
              </div>
              {/* Pins bottom */}
              <div className={`${styles.chipPins} ${styles.chipPinsBottom}`}>
                {[...Array(6)].map((_, i) => <span key={i} className={styles.chipPin} />)}
              </div>
              {/* Pins left */}
              <div className={`${styles.chipPins} ${styles.chipPinsLeft}`}>
                {[...Array(5)].map((_, i) => <span key={i} className={`${styles.chipPin} ${styles.chipPinH}`} />)}
              </div>
              {/* Pins right */}
              <div className={`${styles.chipPins} ${styles.chipPinsRight}`}>
                {[...Array(5)].map((_, i) => <span key={i} className={`${styles.chipPin} ${styles.chipPinH}`} />)}
              </div>
              {/* CPU icon SVG */}
              <svg className={styles.chipSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <rect x="8" y="8" width="8" height="8" rx="1"/>
                <path d="M12 2v2M17 2v2M7 2v2"/>
                <path d="M12 20v2M17 20v2M7 20v2"/>
                <path d="M2 12h2M2 17h2M2 7h2"/>
                <path d="M20 12h2M20 17h2M20 7h2"/>
              </svg>
              <div className={styles.chipCorner} style={{top:6,left:6}}/>
              <div className={styles.chipCorner} style={{top:6,right:6}}/>
              <div className={styles.chipCorner} style={{bottom:6,left:6}}/>
              <div className={styles.chipCorner} style={{bottom:6,right:6}}/>
            </div>
          </div>
          <div className={styles.chipLabel}>
            <span className={styles.chipLabelMuted}>AMD</span>
            <span className={styles.chipLabelBrand}> EPYC™</span>
          </div>
        </div>

        {/* Big stats row */}
        <div className={styles.hwBigStats}>
          <div className={styles.hwBigStat}>
            <span className={styles.hwBigStatVal}>20</span>
            <span className={styles.hwBigStatUnit}>TPS</span>
            <span className={styles.hwBigStatLabel}>满帧运行</span>
          </div>
          <div className={styles.hwBigStatDivider}/>
          <div className={styles.hwBigStat}>
            <span className={styles.hwBigStatVal}>16</span>
            <span className={styles.hwBigStatUnit}>GB</span>
            <span className={styles.hwBigStatLabel}>运行内存</span>
          </div>
          <div className={styles.hwBigStatDivider}/>
          <div className={styles.hwBigStat}>
            <span className={styles.hwBigStatVal}>24</span>
            <span className={styles.hwBigStatUnit}>/ 7</span>
            <span className={styles.hwBigStatLabel}>持续在线</span>
          </div>
        </div>

        {/* Spec cards */}
        <div className={styles.hardwareGrid}>
          {([
            {
              label: '处理器', value: 'AMD EPYC™', sub: '高性能多核处理器',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                  <rect x="8" y="8" width="8" height="8" rx="1"/>
                  <path d="M12 2v2M17 2v2M7 2v2"/>
                  <path d="M12 20v2M17 20v2M7 20v2"/>
                  <path d="M2 12h2M2 17h2M2 7h2"/>
                  <path d="M20 12h2M20 17h2M20 7h2"/>
                </svg>
              ),
            },
            {
              label: '内存', value: '16 GB', sub: 'DDR5 高速内存',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="8" width="20" height="10" rx="2"/>
                  <path d="M6 8V6M10 8V6M14 8V6M18 8V6"/>
                  <path d="M6 18v1M10 18v1M14 18v1M18 18v1"/>
                  <path d="M6 13h.01M10 13h.01M14 13h.01M18 13h.01"/>
                </svg>
              ),
            },
            {
              label: '存储', value: 'SSD', sub: '低延迟固态存储',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <circle cx="17" cy="12" r="2"/>
                  <path d="M2 12h10M6 9h4M6 15h4"/>
                </svg>
              ),
            },
            {
              label: '网络', value: '100 Mbps', sub: '低延迟稳定专线',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19h.01"/>
                  <path d="M8.5 16.5a5 5 0 0 1 7 0"/>
                  <path d="M5 13a9 9 0 0 1 14 0"/>
                  <path d="M2 9.5a13 13 0 0 1 20 0"/>
                </svg>
              ),
            },
            {
              label: '服务端', value: 'Fabric', sub: '高性能 Minecraft 核心',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              ),
            },
            {
              label: '版本', value: '1.21.11', sub: 'Java Edition',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                  <path d="M7 8l3 3-3 3M13 14h4"/>
                </svg>
              ),
            },
          ] as { label: string; value: string; sub: string; icon: React.ReactNode }[]).map((item) => (
            <div key={item.label} className={styles.hwCard}>
              <div className={styles.hwCardIcon}>{item.icon}</div>
              <div className={styles.hwCardBody}>
                <span className={styles.hwCardLabel}>{item.label}</span>
                <span className={styles.hwCardValue}>{item.value}</span>
                <span className={styles.hwCardSub}>{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.grassDivider} aria-hidden="true" />
      <div className={styles.dirtDivider} aria-hidden="true" />

      {/* ── Gallery ── */}
      <div className={styles.gallerySection}>
        <div className={styles.sectionFull}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>GALLERY</span>
              <h2 className={styles.sectionTitle}>留住<em>每一帧</em></h2>
              <p className={styles.sectionSubtitle}>
                一座拔地而起的城堡，一场日落时分的偶遇。这些由玩家亲手创造的瞬间，是服务器里最真实的风景
              </p>
            </div>
            <div className={styles.galleryGrid}>
              {GALLERY.map((item) => (
                <div key={item.src} className={styles.galleryItem}>
                  <img src={item.src} alt={item.alt} className={styles.galleryImg} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.grassDivider} aria-hidden="true" />
      <div className={styles.dirtDivider} aria-hidden="true" />

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>JOIN US</span>
          <h2 className={styles.sectionTitle}>找到<em>你的位置</em></h2>
          <p className={styles.sectionSubtitle}>
            不需要门槛，不需要理由。进来看看，也许这里就是你一直在找的地方。
          </p>
        </div>
        <Link href="/getting-started" className={styles.btnPrimary}>开始你的冒险</Link>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <span className={styles.footerLogo}>ENU</span>
        <p className={styles.footerText}>© 2026 ENU Server · All rights reserved</p>
      </footer>

    </div>
  )
}
