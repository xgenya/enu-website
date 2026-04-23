'use client'

import Link from 'next/link'
import styles from '../home.module.css'
import { useScrollReveal, useStaggerReveal } from './hooks'
import { FEATURES, GALLERY } from './constants'
import homeConfig from '../../../config/home'

const { whyEnu, gallery: galleryCopy, cta, infrastructure: _infrastructure } = homeConfig.sections

export function WhyEnuSection() {
  const header = useScrollReveal()
  const { containerRef, visibleItems } = useStaggerReveal(FEATURES.length)

  return (
    <div className={styles.section}>
      <div
        ref={header.ref}
        className={`${styles.sectionHeader} ${styles.reveal} ${header.isVisible ? styles.revealVisible : ''}`}
      >
        <span className={styles.sectionEyebrow}>{whyEnu.eyebrow}</span>
        <h2 className={styles.sectionTitle}>{whyEnu.title}<em>{whyEnu.titleEm}</em></h2>
        <p className={styles.sectionSubtitle}>{whyEnu.subtitle}</p>
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
            <span className={styles.sectionEyebrow}>{galleryCopy.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{galleryCopy.title}<em>{galleryCopy.titleEm}</em></h2>
            <p className={styles.sectionSubtitle}>{galleryCopy.subtitle}</p>
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
        <span className={styles.sectionEyebrow}>{cta.eyebrow}</span>
        <h2 className={styles.sectionTitle}>{cta.title}<em>{cta.titleEm}</em></h2>
        <p className={styles.sectionSubtitle}>{cta.subtitle}</p>
      </div>
      <Link href={cta.btnHref} className={styles.btnPrimary}>{cta.btnLabel}</Link>
    </section>
  )
}
