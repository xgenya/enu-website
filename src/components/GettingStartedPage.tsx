'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './getting-started.module.css'

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

const MOD_CARDS = [
  {
    name: "Xaero's World Map",
    desc: '全屏世界地图，显示你探索过的区域，配合小地图使用效果最佳。',
    icon: 'https://cdn.modrinth.com/data/NcUtCpym/354080f65407e49f486fcf9c4580e82c45ae63b8_96.webp',
    href: 'https://modrinth.com/mod/xaeros-world-map',
    badge: '必装',
  },
  {
    name: "Xaero's Minimap",
    desc: '屏幕角落显示周边地形小地图，支持创建路径点标记位置。',
    icon: 'https://cdn.modrinth.com/data/1bokaNcj/354080f65407e49f486fcf9c4580e82c45ae63b8_96.webp',
    href: 'https://modrinth.com/mod/xaeros-minimap',
    badge: '必装',
  },
]

const MODPACK_CARD = {
  name: 'XPlus PerioTable Modpack (Fabric)',
  desc: '包含上述地图 Mod 的整合包，提升原版游戏体验且不改变游戏机制，推荐直接使用。',
  icon: 'https://cdn.modrinth.com/data/UCpApD3P/eb989b0763ca1ad11ee37e879ff2024294db410f_96.webp',
  href: 'https://modrinth.com/modpack/xplus-2.0-modpack-global',
  badge: '推荐整合包',
}

const STEPS_OFFICIAL: Step[] = [
  {
    step: '01',
    title: '检查 Mod',
    desc: '加入服务器之前，请确保当前使用的整合包内有以下两个 Mod，如果没有自己的整合包，也可以使用 XPlus 原版生电优化整合包。',
    link: null,
    mods: true,
  },
  {
    step: '02',
    title: '启动游戏',
    desc: '使用你喜欢的启动器来启动游戏。',
    link: null,
  },
  {
    step: '03',
    title: '进入多人游戏',
    desc: '在主界面点击「多人游戏」，然后选择「添加服务器」。',
    link: null,
  },
  {
    step: '04',
    title: '填入服务器地址',
    desc: '服务器名称随意填写，地址填入上方的服务器 IP，点击完成。',
    link: null,
    typing: true,
  },
  {
    step: '05',
    title: '加入游戏',
    desc: '双击服务器即可连接，初次进入可能需要等待几秒加载。',
    link: null,
  },
  {
    step: '06',
    title: '游戏内注册',
    desc: '进入游戏后，根据聊天框提示，输入指令完成注册。',
    link: null,
    register: true,
  },
]

const STEPS_CRACKED: Step[] = [
  {
    step: '01',
    title: '下载第三方启动器',
    desc: '推荐使用 PCL2 或 HMCL，免费开源，支持自动安装游戏本体。',
    link: { label: '下载 PCL2', href: 'https://afdian.com/p/0164034c016c11ebafce52540025c377' },
  },
  {
    step: '02',
    title: '检查 Mod',
    desc: '加入服务器之前，请确保当前使用的整合包内有以下两个 Mod，如果没有自己的整合包，也可以使用 XPlus 原版生电优化整合包。',
    link: null,
    mods: true,
  },
  {
    step: '03',
    title: '添加离线账号',
    desc: '打开启动器，选择「离线登录」或「添加账号 → 离线账号」，随意输入一个用户名。',
    link: null,
  },
  {
    step: '04',
    title: '进入多人游戏',
    desc: '启动游戏后，在主界面点击「多人游戏」→「添加服务器」。',
    link: null,
  },
  {
    step: '05',
    title: '填入服务器地址',
    desc: '服务器名称随意填写，地址填入上方的服务器 IP，点击完成后双击连接。',
    link: null,
    typing: true,
  },
  {
    step: '06',
    title: '游戏内注册',
    desc: '进入游戏后，根据聊天框提示，输入指令完成注册。',
    link: null,
    register: true,
  },
]

const CRACKED_OPTIONAL = {
  title: '可选：显示皮肤（LittleSkin）',
  desc: '如果希望在服务器中显示自定义皮肤，可按以下步骤配置 LittleSkin。',
  steps: [
    {
      text: '前往 LittleSkin 官网，按要求注册并绑定账号。注册完成后点击「添加角色」，输入步骤 03 中填写的用户名。',
      link: { label: '前往 LittleSkin', href: 'https://littleskin.cn/' },
    },
    {
      text: '打开 PCL2，进入对应版本的「版本设置」，将登录方式改为「第三方登录 Authlib Injector」或「LittleSkin」。',
      link: null,
    },
    {
      text: '认证服务器填写 https://littleskin.cn/api/yggdrasil，注册链接填写 https://littleskin.cn/auth/register，最后点击「设置为 LittleSkin」。',
      link: null,
    },
  ],
}

const RED_LINES = [
  '严禁尝试和其他玩家进行私下交易，谨防电信诈骗！',
  '严禁侮辱、造谣、性骚扰其他玩家，泄露他人隐私。',
]

const BANS = [
  { text: '禁止使用矿透、卡服等作弊手段。' },
  { text: '禁止开挂（Meteor、Wurst、LiquidBounce、RusherHack、Nami、Mio、Alien、Acid、Baritone 等），一经发现严格处理。' },
  { text: '禁止私造大型红石装置（8 核以上刷铁机、空置域、全物品、百万刷怪塔等），大型装置需管理员审批。' },
  { text: '禁止使用非绿玩功能，公共设施尽量共享使用。' },
  { text: '禁止私自破坏他人装置或建筑，一次警告，再次踢出。' },
  { text: '不熟悉的机器请勿随意启动，可咨询其他玩家或群内询问。' },
]

const BASICS = [
  { icon: '🧱', text: '不破坏他人建筑，不偷窃他人物品。' },
  { icon: '⚔️', text: '未经同意不对其他玩家发起 PVP。' },
  { icon: '💬', text: '聊天友善，不刷屏，不传播不良信息。' },
  { icon: '🌍', text: '大规模改地形前请告知管理员。' },
]

const SERVER_IP = 'eunoia.ink'

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

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>ENU</Link>
        <ul className={styles.navLinks}>
          <li><Link href="/docs" className={styles.navLink}>文档</Link></li>
          <li><Link href="/getting-started" className={styles.navLink}>快速开始</Link></li>
        </ul>
      </nav>

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
                <span className={styles.ipMetaVal}>Java 1.21+</span>
              </span>
              <span className={styles.ipMetaDot} />
              <span className={styles.ipMetaItem}>
                <span className={styles.ipMetaKey}>模式</span>
                <span className={styles.ipMetaVal}>生存</span>
              </span>
              <span className={styles.ipMetaDot} />
              <span className={styles.ipMetaItem}>
                <span className={styles.ipMetaKey}>周目</span>
                <span className={styles.ipMetaVal}>第 2 周目</span>
              </span>
              <span className={styles.ipMetaDot} />
              <span className={styles.ipMetaItem}>
                <span className={styles.ipMetaKey}>难度</span>
                <span className={styles.ipMetaVal}>困难</span>
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
              <p className={styles.whitelistText}>本服务器为<strong>白名单制度</strong>，需要加入 QQ 群并在群内申请白名单资格后方可进入。</p>
            </div>
          </div>
          <a
            href="https://qun.qq.com/universal-share/share?ac=1&authKey=LXv0cr308KBlKU5e6oAMEXVSLqhdh0CmwjIY6DgxMqwaiW%2FdvIe7IBMzB%2BYB2kB2&busi_data=eyJncm91cENvZGUiOiI3MzQ4NTg1ODEiLCJ0b2tlbiI6InFXNC95MGRaRnVWZVFBSDVxOWhVY2tIV0JTb05DdXhsK3hNb3BXSmdNYUZXVC9HODVRMllkR25nOGhzMnlVaDEiLCJ1aW4iOiIxNDE4MDM0NTMxIn0%3D&data=EAUoW0ls7v5Yo0ZCCJ1FU7Qqeo-WPok4WQnDSN45vJ60cXUr8LeMncPz1A1h8tfeXaz63VLIRqWUTx4nbctQjA&svctype=4&tempid=h5_group_info"
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
