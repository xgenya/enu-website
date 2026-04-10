'use client'

import Link from 'next/link'
import styles from './about.module.css'

const PARTICLES = [
  { left: '8%',  delay: '0s',   duration: '12s', size: 3 },
  { left: '20%', delay: '2.4s', duration: '9s',  size: 2 },
  { left: '35%', delay: '5s',   duration: '14s', size: 4 },
  { left: '50%', delay: '1.2s', duration: '11s', size: 2 },
  { left: '63%', delay: '7s',   duration: '10s', size: 3 },
  { left: '78%', delay: '3.6s', duration: '13s', size: 2 },
  { left: '90%', delay: '0.8s', duration: '15s', size: 3 },
]

const TEAM = [
  {
    role: '服务器创始人',
    name: 'zhang',
    tag: 'FOUNDER',
    desc: '服务器的创立者与愿景的守护者，从零开始搭建起这片生电大陆，为所有玩家提供稳定、纯粹的原版生存体验。负责服务器的整体方向与长期运营决策。',
    color: '#f0c060',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    role: '核心管理',
    name: 'sixihappy',
    tag: 'ADMIN',
    desc: '服务器的核心管理员，维护社区秩序、处理玩家事务，确保每一位成员都能在公平友善的环境中游玩。同时负责白名单审核与群内事务协调。',
    color: '#5db85d',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    role: '开发团队',
    name: 'remrinya',
    tag: 'DEV',
    desc: '负责服务器网站与技术基础设施的开发与维护，包括本站的构建部署与持续迭代。以代码为砖瓦，为玩家社区打造更好的数字体验。',
    color: '#7090e0',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Particles */}
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

      {/* Dot grid texture */}
      <div className={styles.dotGrid} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      {/* Navbar */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>ENU</Link>
        <ul className={styles.navLinks}>
          <li><Link href="/" className={styles.navLink}>首页</Link></li>
          <li><Link href="/getting-started" className={styles.navLink}>快速开始</Link></li>
          <li><Link href="/docs" className={styles.navLink}>文档</Link></li>
        </ul>
      </nav>

      {/* Content */}
      <main className={styles.page}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>ABOUT US</span>
          <h1 className={styles.title}>认识我们</h1>
          <p className={styles.subtitle}>
            ENU 生电服由一群热爱原版 Minecraft 的玩家共同建立，致力于提供<br />
            纯净、稳定、公平的生存体验，不干预、不妥协。
          </p>
        </div>

        {/* Story section */}
        <section className={styles.storySection}>
          <div className={styles.storyInner}>
            <h2 className={styles.storyTitle}>我们的故事</h2>
            <p className={styles.storyText}>
              ENU 服务器从一台简单的机器和一个简单的想法起步——在这里，每一块方块都有意义，每一条红石线路都值得被认真对待。我们拒绝传送、拒绝死亡不掉落、拒绝任何削弱原版体验的妥协，因为我们相信，最好的 Minecraft 就是原版的 Minecraft。
            </p>
            <p className={styles.storyText}>
              服务器采用白名单制度，每一位成员都经过筛选，目的只有一个：让这里成为真正热爱这款游戏的人可以长期定居的地方。
            </p>
          </div>
        </section>

        {/* Team */}
        <section className={styles.teamSection}>
          <h2 className={styles.teamHeading}>团队成员</h2>
          <div className={styles.teamGrid}>
            {TEAM.map((member) => (
              <div key={member.name} className={styles.memberCard}>
                <div className={styles.memberIconWrap} style={{ '--member-color': member.color } as React.CSSProperties}>
                  {member.icon}
                </div>
                <div className={styles.memberTag} style={{ color: member.color }}>{member.tag}</div>
                <div className={styles.memberName}>{member.name}</div>
                <div className={styles.memberRole}>{member.role}</div>
                <p className={styles.memberDesc}>{member.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <p className={styles.ctaText}>准备好加入我们了吗？</p>
          <div className={styles.ctaButtons}>
            <Link href="/getting-started" className={styles.btnPrimary}>快速开始</Link>
            <Link href="/docs" className={styles.btnSecondary}>查看文档</Link>
          </div>
        </section>
      </main>
    </div>
  )
}
