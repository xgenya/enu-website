'use client'

import { useEffect, useState } from 'react'
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
    icon: '/images/mc-icons/diamond_pickaxe.png',
    title: '精心调校的世界',
    desc: '深度优化的地形生成，让每一片山川都更具探索价值。无论是高耸入云的雪峰，还是幽深曲折的洞穴，都值得你驻足停留',
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

export default function MCHomePage() {
  const [players, setPlayers] = useState<string>('--')
  const [serverOnline, setServerOnline] = useState(true)

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
        <p className={styles.heroSubtitle}>给热爱方块的人，一个落脚的地方</p>
        <p className={styles.heroDesc}>每段冒险都值得被认真对待，而你的篇章从这里翻开</p>

        <div className={styles.heroBtnGroup}>
          <Link href="/docs/getting-started" className={styles.btnPrimary}>开始你的冒险</Link>
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
        <Link href="/docs/getting-started" className={styles.btnPrimary}>开始你的冒险</Link>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <span className={styles.footerLogo}>ENU</span>
        <p className={styles.footerText}>© 2026 ENU Server · All rights reserved</p>
      </footer>

    </div>
  )
}
