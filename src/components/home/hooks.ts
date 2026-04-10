import { useEffect, useState, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

export function useStaggerReveal(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(itemCount).fill(false))

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visibleItems.forEach((_, i) => {
            setTimeout(() => {
              setVisibleItems(prev => {
                const next = [...prev]
                next[i] = true
                return next
              })
            }, i * 100)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [itemCount])

  return { containerRef, visibleItems }
}

export function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0)
  const prevTarget = useRef(0)

  useEffect(() => {
    if (target === prevTarget.current) return
    const start = prevTarget.current
    const diff = target - start
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(start + diff * eased))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        prevTarget.current = target
      }
    }

    requestAnimationFrame(animate)
  }, [target, duration])

  return value
}

export function useHeroTyping(phrases: string[]) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const phrase = phrases[phraseIdx]

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
          setPhraseIdx((i) => (i + 1) % phrases.length)
          setPhase('typing')
        }, 300)
      }
    }

    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [phase, charIdx, phraseIdx, phrases])

  return { displayed, phase }
}
