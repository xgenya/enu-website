'use client'

import Link from 'next/link'
import styles from '../home.module.css'
import { useScrollReveal, useStaggerReveal } from './hooks'
import { FEATURES, GALLERY } from './constants'

export function WhyEnuSection() {
  const header = useScrollReveal()
  const { containerRef, visibleItems } = useStaggerReveal(FEATURES.length)

  return (
    <div className={styles.section}>
      <div
        ref={header.ref}
        className={`${styles.sectionHeader} ${styles.reveal} ${header.isVisible ? styles.revealVisible : ''}`}
      >
        <span className={styles.sectionEyebrow}>WHY ENU</span>
        <h2 className={styles.sectionTitle}>在这里<em>安心生存</em></h2>
        <p className={styles.sectionSubtitle}>
          用心打磨每一个细节，只为让你在方块世界里，找到一份踏实与安心。
        </p>
      </div>
      <div ref={containerRef} className={styles.featuresGrid}>
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={`${styles.featureCard} ${styles.reveal} ${visibleItems[i] ? styles.revealVisible : ''}`}
          >
            <img src={f.icon} alt={f.title} className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function GallerySection() {
  const header = useScrollReveal()
  const { containerRef, visibleItems } = useStaggerReveal(GALLERY.length)

  return (
    <div className={styles.gallerySection}>
      <div className={styles.sectionFull}>
        <div className={styles.sectionInner}>
          <div
            ref={header.ref}
            className={`${styles.sectionHeader} ${styles.reveal} ${header.isVisible ? styles.revealVisible : ''}`}
          >
            <span className={styles.sectionEyebrow}>GALLERY</span>
            <h2 className={styles.sectionTitle}>留住<em>每一帧</em></h2>
            <p className={styles.sectionSubtitle}>
              一座拔地而起的城堡，一场日落时分的偶遇。这些由玩家亲手创造的瞬间，是服务器里最真实的风景
            </p>
          </div>
          <div ref={containerRef} className={styles.galleryGrid}>
            {GALLERY.map((item, i) => (
              <div
                key={item.src}
                className={`${styles.galleryItem} ${styles.reveal} ${visibleItems[i] ? styles.revealVisible : ''}`}
              >
                <img src={item.src} alt={item.alt} className={styles.galleryImg} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CtaSection() {
  const reveal = useScrollReveal()

  return (
    <section
      ref={reveal.ref}
      className={`${styles.ctaSection} ${styles.reveal} ${reveal.isVisible ? styles.revealVisible : ''}`}
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>JOIN US</span>
        <h2 className={styles.sectionTitle}>找到<em>你的位置</em></h2>
        <p className={styles.sectionSubtitle}>
          不需要门槛，不需要理由。进来看看，也许这里就是你一直在找的地方。
        </p>
      </div>
      <Link href="/getting-started" className={styles.btnPrimary}>开始你的冒险</Link>
    </section>
  )
}
