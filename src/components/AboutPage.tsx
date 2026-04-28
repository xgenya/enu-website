'use client'

import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import styles from './about.module.css'
import Navbar from './Navbar'
import PlayerAvatar from './PlayerAvatar'

const PARTICLES = [
  { left: '8%',  delay: '0s',   duration: '12s', size: 3 },
  { left: '20%', delay: '2.4s', duration: '9s',  size: 2 },
  { left: '35%', delay: '5s',   duration: '14s', size: 4 },
  { left: '50%', delay: '1.2s', duration: '11s', size: 2 },
  { left: '63%', delay: '7s',   duration: '10s', size: 3 },
  { left: '78%', delay: '3.6s', duration: '13s', size: 2 },
  { left: '90%', delay: '0.8s', duration: '15s', size: 3 },
]

import teamConfig from '../../config/team'

const CORE_MEMBERS = teamConfig.coreMembers
const TEAM = teamConfig.team

function CoreMemberCard({ username, name, color }: { username: string; name: string; color: string }) {
  return (
    <div className={styles.coreMemberCard} style={{ '--member-color': color } as React.CSSProperties}>
      <div className={styles.coreMemberContent}>
        <PlayerAvatar
          username={username}
          size={48}
          className={styles.coreMcAvatar}
        />
        <div className={styles.coreMemberName}>{name}</div>
      </div>
    </div>
  )
}

function McAvatar({ username, color }: { username: string; color: string }) {
  return (
    <div className={styles.avatarContainer} style={{ '--member-color': color } as React.CSSProperties}>
      <PlayerAvatar
        username={username}
        size={64}
        className={styles.mcAvatar}
      />
    </div>
  )
}

function MemberCard({ member }: { member: typeof TEAM[number] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [is3DReady, setIs3DReady] = useState(false)

  useEffect(() => {
    if (!isHovered || !canvasRef.current || viewerRef.current) return

    let mounted = true

    import('skinview3d').then(({ SkinViewer }) => {
      if (!mounted || !canvasRef.current) return

      const viewer = new SkinViewer({
        canvas: canvasRef.current,
        width: 140,
        height: 240,
        skin: `https://mc-heads.net/skin/${member.username}`,
      })

      viewer.camera.position.set(0, 5, 32)
      viewer.camera.lookAt(0, 5, 0)
      viewer.autoRotate = false
      viewer.zoom = 0.85
      
      if (viewer.playerObject) {
        viewer.playerObject.position.y = -8
      }

      viewerRef.current = viewer
      setIs3DReady(true)
    })

    return () => {
      mounted = false
    }
  }, [isHovered, member.username])

  useEffect(() => {
    if (!isHovered && viewerRef.current) {
      viewerRef.current.dispose()
      viewerRef.current = null
      setIs3DReady(false)
    }
  }, [isHovered])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!viewerRef.current?.playerObject || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) / rect.width
    const deltaY = (e.clientY - centerY) / rect.height

    const skin = viewerRef.current.playerObject.skin
    if (skin?.head) {
      skin.head.rotation.y = deltaX * 0.8
      skin.head.rotation.x = deltaY * 0.4
    }
  }

  return (
    <div
      ref={cardRef}
      className={styles.memberCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className={`${styles.skinCanvas} ${isHovered && is3DReady ? styles.skinCanvasVisible : ''}`}
      />
      <div className={styles.memberContent}>
        <McAvatar username={member.username} color={member.color} />
        <div className={styles.memberTag} style={{ color: member.color }}>{member.tag}</div>
        <div className={styles.memberName}>{member.name}</div>
        <div className={styles.memberRole}>{member.role}</div>
        <p className={styles.memberDesc}>{member.desc}</p>
      </div>
    </div>
  )
}

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

      <Navbar />

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
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* Core Members */}
        <section className={styles.teamSection}>
          <h2 className={styles.teamHeading}>核心成员</h2>
          <div className={styles.coreMemberGrid}>
            {CORE_MEMBERS.map((member) => (
              <CoreMemberCard key={member.username} {...member} />
            ))}
            <div className={styles.coreMemberPlaceholder}>
              <div className={styles.coreMemberPlaceholderInner}>
                <span className={styles.coreMemberPlaceholderTitle}>虚位以待</span>
                <span className={styles.coreMemberPlaceholderSub}>ENU 大家庭等待你的加入</span>
              </div>
            </div>
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
