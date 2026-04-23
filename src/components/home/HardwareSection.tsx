'use client'

import React from 'react'
import styles from '../home.module.css'
import { useScrollReveal, useStaggerReveal } from './hooks'
import hardwareConfig from '../../../config/home'

const { infrastructure } = hardwareConfig.sections
import hwConfig from '../../../config/hardware'

type IconKey = 'cpu' | 'ram' | 'storage' | 'network' | 'server' | 'version'

const ICONS: Record<IconKey, React.ReactNode> = {
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="8" y="8" width="8" height="8" rx="1"/>
      <path d="M12 2v2M17 2v2M7 2v2"/>
      <path d="M12 20v2M17 20v2M7 20v2"/>
      <path d="M2 12h2M2 17h2M2 7h2"/>
      <path d="M20 12h2M20 17h2M20 7h2"/>
    </svg>
  ),
  ram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="20" height="10" rx="2"/>
      <path d="M6 8V6M10 8V6M14 8V6M18 8V6"/>
      <path d="M6 18v1M10 18v1M14 18v1M18 18v1"/>
      <path d="M6 13h.01M10 13h.01M14 13h.01M18 13h.01"/>
    </svg>
  ),
  storage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <circle cx="17" cy="12" r="2"/>
      <path d="M2 12h10M6 9h4M6 15h4"/>
    </svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19h.01"/>
      <path d="M8.5 16.5a5 5 0 0 1 7 0"/>
      <path d="M5 13a9 9 0 0 1 14 0"/>
      <path d="M2 9.5a13 13 0 0 1 20 0"/>
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  version: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
      <path d="M7 8l3 3-3 3M13 14h4"/>
    </svg>
  ),
}

const HW_SPECS = hwConfig.specs.map((s) => ({
  ...s,
  icon: ICONS[s.iconKey as IconKey],
}))

const HW_BIG_STATS = hwConfig.bigStats

export function HardwareSection() {
  const header = useScrollReveal()
  const chip = useScrollReveal()
  const stats = useScrollReveal()
  const { containerRef, visibleItems } = useStaggerReveal(HW_SPECS.length)

  return (
    <div className={styles.section}>
      <div
        ref={header.ref}
        className={`${styles.sectionHeader} ${styles.reveal} ${header.isVisible ? styles.revealVisible : ''}`}
      >
        <span className={styles.sectionEyebrow}>{infrastructure.eyebrow}</span>
        <h2 className={styles.sectionTitle}>{infrastructure.title}<em>{infrastructure.titleEm}</em></h2>
        <p className={styles.sectionSubtitle}>{infrastructure.subtitle}</p>
      </div>

      <div
        ref={chip.ref}
        className={`${styles.chipWrap} ${styles.reveal} ${chip.isVisible ? styles.revealVisible : ''}`}
      >
        <div className={`${styles.chipRing} ${styles.chipRing1}`}>
          <span className={styles.chipRingDot} />
        </div>
        <div className={`${styles.chipRing} ${styles.chipRing2}`}>
          <span className={`${styles.chipRingDot} ${styles.chipRingDot2}`} />
        </div>
        <div className={`${styles.chipRing} ${styles.chipRing3}`}>
          <span className={`${styles.chipRingDot} ${styles.chipRingDot3}`} />
        </div>
        <div className={styles.chipBox}>
          <div className={styles.chipInner}>
            <div className={`${styles.chipPins} ${styles.chipPinsTop}`}>
              {[...Array(6)].map((_, i) => <span key={i} className={styles.chipPin} />)}
            </div>
            <div className={`${styles.chipPins} ${styles.chipPinsBottom}`}>
              {[...Array(6)].map((_, i) => <span key={i} className={styles.chipPin} />)}
            </div>
            <div className={`${styles.chipPins} ${styles.chipPinsLeft}`}>
              {[...Array(5)].map((_, i) => <span key={i} className={`${styles.chipPin} ${styles.chipPinH}`} />)}
            </div>
            <div className={`${styles.chipPins} ${styles.chipPinsRight}`}>
              {[...Array(5)].map((_, i) => <span key={i} className={`${styles.chipPin} ${styles.chipPinH}`} />)}
            </div>
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
          <span className={styles.chipLabelMuted}>{hwConfig.chipLabel.muted}</span>
          <span className={styles.chipLabelBrand}>{hwConfig.chipLabel.brand}</span>
        </div>
      </div>

      <div
        ref={stats.ref}
        className={`${styles.hwBigStats} ${styles.reveal} ${stats.isVisible ? styles.revealVisible : ''}`}
      >
        {HW_BIG_STATS.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && <div className={styles.hwBigStatDivider}/>}
            <div className={styles.hwBigStat}>
              <span className={styles.hwBigStatVal}>{s.value}</span>
              <span className={styles.hwBigStatUnit}>{s.unit}</span>
              <span className={styles.hwBigStatLabel}>{s.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div ref={containerRef} className={styles.hardwareGrid}>
        {HW_SPECS.map((item, i) => (
          <div
            key={item.label}
            className={`${styles.hwCard} ${styles.reveal} ${visibleItems[i] ? styles.revealVisible : ''}`}
          >
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
  )
}
