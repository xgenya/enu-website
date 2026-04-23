'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './getting-started.module.css'
import Navbar from './Navbar'

import gsConfig from '../../config/getting-started'

const SERVER_IP = gsConfig.serverHost

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

type Step = {
  step: string
  title: string
  desc: string
  link: { label: string; href: string } | null
  mods?: boolean
  typing?: boolean
  register?: boolean
}

const MOD_CARDS = gsConfig.mods
const MODPACK_CARD = gsConfig.modpack
const STEPS_OFFICIAL: Step[] = gsConfig.stepsOfficial as Step[]
const STEPS_CRACKED: Step[] = gsConfig.stepsCracked as Step[]
const CRACKED_OPTIONAL = gsConfig.crackedOptional
const RED_LINES = gsConfig.redLines
const BANS = gsConfig.bans
const BASICS = gsConfig.basics

function TypingDemo() {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'done' | 'pause'>('pause')
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // start after 600ms delay
    ref.current = setTimeout(() => setPhase('typing'), 600)
    return () => { if (ref.current) clearTimeout(ref.current) }
  }, [])

  useEffect(() => {
    if (phase === 'typing') {
      if (displayed.length < SERVER_IP.length) {
        ref.current = setTimeout(() => {
          setDisplayed(SERVER_IP.slice(0, displayed.length + 1))
        }, 90)
      } else {
        setPhase('done')
      }
    }
    if (phase === 'done') {
      // restart after 3s
      ref.current = setTimeout(() => {
        setDisplayed('')
        setPhase('typing')
      }, 3000)
    }
    return () => { if (ref.current) clearTimeout(ref.current) }
  }, [phase, displayed])

  return (
    <div className={styles.typingDemo}>
      <div className={styles.typingDemoRow}>
        <span className={styles.typingDemoLabel}>服务器名称</span>
        <div className={styles.typingDemoField}>
          <span className={styles.typingDemoTextMuted}>ENU</span>
        </div>
      </div>
      <div className={styles.typingDemoRow}>
        <span className={styles.typingDemoLabel}>服务器地址</span>
        <div className={styles.typingDemoField}>
          <span className={styles.typingDemoText}>{displayed}</span>
          <span className={styles.typingDemoCursor} />
        </div>
      </div>
      <div className={styles.typingDemoBtns}>
        <button className={styles.typingDemoBtnGhost}>取消</button>
        <button className={`${styles.typingDemoBtnPrimary} ${phase === 'done' ? styles.typingDemoBtnReady : ''}`}>完成</button>
      </div>
    </div>
  )
}

export default function GettingStartedPage() {
  const [tab, setTab] = useState<'official' | 'cracked'>('official')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const steps = tab === 'official' ? STEPS_OFFICIAL : STEPS_CRACKED

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
              bottom: '-10px',
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <Navbar />

      <div className={styles.page}>

        {/* Hero */}
        <div className={styles.hero}>
          <span className={styles.eyebrow}>GETTING STARTED</span>
          <h1 className={styles.title}>加入 ENU</h1>
          <p className={styles.subtitle}>选择你的游戏方式，按步骤加入服务器</p>
        </div>

        {/* Server IP card — info + copy address */}
        <div className={styles.ipHeroWrap}>
          <div className={styles.ipHero}>

            {/* Server meta row */}
            <div className={styles.ipMeta}>
              <span className={styles.ipMetaItem}>
                <span className={styles.ipMetaKey}>版本</span>
                <span className={styles.ipMetaVal}>{gsConfig.version}</span>
              </span>
              <span className={styles.ipMetaDot} />
              <span className={styles.ipMetaItem}>
                <span className={styles.ipMetaKey}>模式</span>
                <span className={styles.ipMetaVal}>{gsConfig.mode}</span>
              </span>
              <span className={styles.ipMetaDot} />
              <span className={styles.ipMetaItem}>
                <span className={styles.ipMetaKey}>周目</span>
                <span className={styles.ipMetaVal}>{gsConfig.season}</span>
              </span>
              <span className={styles.ipMetaDot} />
              <span className={styles.ipMetaItem}>
                <span className={styles.ipMetaKey}>难度</span>
                <span className={styles.ipMetaVal}>{gsConfig.difficulty}</span>
              </span>
            </div>

            <p className={styles.ipHeroLabel}>SERVER ADDRESS</p>
            <p className={styles.ipHeroValue}>{SERVER_IP}</p>
            <button
              className={`${styles.ipHeroBtn} ${copied ? styles.ipHeroBtnDone : ''}`}
              onClick={handleCopy}
            >
              {copied ? (
                <><span className={styles.ipHeroBtnIcon}>✓</span> 已复制到剪贴板</>
              ) : (
                <><span className={styles.ipHeroBtnIcon}>⬡</span> 复制服务器地址</>
              )}
            </button>
          </div>
        </div>

        {/* Whitelist notice */}
        <div className={styles.whitelistNotice}>
          <div className={styles.whitelistNoticeContent}>
            <span className={styles.whitelistIcon}>🔒</span>
            <div>
              <p className={styles.whitelistText}>{gsConfig.whitelistNote}</p>
            </div>
          </div>
          <a
            href={gsConfig.qqGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whitelistBtn}
          >
            <span>💬</span> 加入 QQ 群
          </a>
        </div>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'official' ? styles.tabActive : ''}`}
            onClick={() => setTab('official')}
          >
            <span className={styles.tabIcon}>✅</span>
            正版
          </button>
          <button
            className={`${styles.tab} ${tab === 'cracked' ? styles.tabActive : ''}`}
            onClick={() => setTab('cracked')}
          >
            <span className={styles.tabIcon}>🔓</span>
            离线版
          </button>
        </div>

        {/* Steps */}
        <section className={styles.section}>
          <div className={styles.steps}>
            {steps.map((s) => (
              <div key={s.step} className={styles.stepCard}>
                <span className={styles.stepNum}>{s.step}</span>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                  {s.link && (
                    <a href={s.link.href} target="_blank" rel="noopener noreferrer" className={styles.stepLink}>
                      {s.link.label} →
                    </a>
                  )}
                  {'mods' in s && s.mods && (
                    <div className={styles.modCards}>
                      <div className={styles.modCardRow}>
                        {MOD_CARDS.map((mod) => (
                          <a key={mod.href} href={mod.href} target="_blank" rel="noopener noreferrer" className={styles.modCard}>
                            <img src={mod.icon} alt={mod.name} className={styles.modCardIcon} />
                            <div className={styles.modCardBody}>
                              <span className={styles.modCardBadge}>{mod.badge}</span>
                              <span className={styles.modCardName}>{mod.name}</span>
                              <span className={styles.modCardDesc}>{mod.desc}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                      <p className={styles.modCardsOr}>或者直接使用整合包</p>
                      <a href={MODPACK_CARD.href} target="_blank" rel="noopener noreferrer" className={`${styles.modCard} ${styles.modCardFeatured}`}>
                        <img src={MODPACK_CARD.icon} alt={MODPACK_CARD.name} className={styles.modCardIcon} />
                        <div className={styles.modCardBody}>
                          <span className={`${styles.modCardBadge} ${styles.modCardBadgeFeatured}`}>{MODPACK_CARD.badge}</span>
                          <span className={styles.modCardName}>{MODPACK_CARD.name}</span>
                          <span className={styles.modCardDesc}>{MODPACK_CARD.desc}</span>
                        </div>
                      </a>
                    </div>
                  )}
                  {'typing' in s && s.typing && <TypingDemo />}
                  {'register' in s && s.register && (
                    <div className={styles.registerDemo}>
                      <span className={styles.registerDemoPrompt}>&gt;</span>
                      <span className={styles.registerDemoCmd}>/register</span>
                      <span className={styles.registerDemoArg}> &lt;密码&gt;</span>
                      <span className={styles.registerDemoArg}> &lt;确认密码&gt;</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {tab === 'cracked' && (
            <div className={styles.optionalSection}>
              <div className={styles.optionalHeader}>
                <span className={styles.optionalBadge}>可选</span>
                <h3 className={styles.optionalTitle}>{CRACKED_OPTIONAL.title}</h3>
              </div>
              <p className={styles.optionalDesc}>{CRACKED_OPTIONAL.desc}</p>
              <ol className={styles.optionalSteps}>
                {CRACKED_OPTIONAL.steps.map((s, i) => (
                  <li key={i} className={styles.optionalStep}>
                    <span className={styles.optionalStepNum}>{i + 1}</span>
                    <div className={styles.optionalStepBody}>
                      <p className={styles.optionalStepText}>{s.text}</p>
                      {s.link && (
                        <a href={s.link.href} target="_blank" rel="noopener noreferrer" className={styles.stepLink}>
                          {s.link.label} →
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* Rules */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>服务器规则</h2>
          <p className={styles.rulesIntro}>规则不多，但请认真阅读。</p>

          {/* Basics */}
          <div className={styles.ruleGroup}>
            <div className={styles.ruleGroupHeader}>
              <span className={styles.ruleGroupDot} style={{ background: '#5db85d' }} />
              <span className={styles.ruleGroupLabel} style={{ color: '#5db85d' }}>基本规则</span>
            </div>
            <ul className={styles.rulesList}>
              {BASICS.map((b) => (
                <li key={b.text} className={styles.ruleItem}>
                  <span className={styles.ruleIcon}>{b.icon}</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Red lines */}
          <div className={styles.ruleGroup}>
            <div className={styles.ruleGroupHeader}>
              <span className={styles.ruleGroupDot} style={{ background: '#e05555' }} />
              <span className={styles.ruleGroupLabel} style={{ color: '#e07070' }}>红线 — 一经发现立刻踢出</span>
            </div>
            <ul className={styles.rulesList}>
              {RED_LINES.map((text) => (
                <li key={text} className={`${styles.ruleItem} ${styles.ruleItemRed}`}>
                  <span className={styles.ruleIcon}>🚫</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bans */}
          <div className={styles.ruleGroup}>
            <div className={styles.ruleGroupHeader}>
              <span className={styles.ruleGroupDot} style={{ background: '#c8a040' }} />
              <span className={styles.ruleGroupLabel} style={{ color: '#c8a040' }}>禁止事项</span>
            </div>
            <ul className={styles.rulesList}>
              {BANS.map((b) => (
                <li key={b.text} className={styles.ruleItem}>
                  <span className={styles.ruleIcon}>⚠️</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>

      <footer className={styles.footer}>
        <span className={styles.footerLogo}>ENU</span>
        <p className={styles.footerText}>© 2026 ENU Server · All rights reserved</p>
      </footer>
    </div>
  )
}
