'use client'

import styles from '../home.module.css'
import { useCountUp } from './hooks'

export function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const animated = useCountUp(value)
  return <>{animated}{suffix}</>
}

export function SignalBars({ ping }: { ping?: number }) {
  if (!ping) return null
  const ms = Math.round(ping)
  const bars = ms < 80 ? 4 : ms < 150 ? 3 : ms < 250 ? 2 : 1
  
  return (
    <div className={styles.signalWrap} title={`${ms}ms`}>
      <div className={styles.signalBars}>
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`${styles.signalBar} ${i <= bars ? styles.signalBarActive : ''}`}
            style={{ height: `${i * 3 + 2}px` }}
          />
        ))}
      </div>
      <span className={styles.signalTooltip}>{ms}ms</span>
    </div>
  )
}
