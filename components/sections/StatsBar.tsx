'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './StatsBar.module.css'

interface Stat { value: string; unit: string; label: string }
interface Props { stats?: Stat[] }

const DEFAULT_STATS: Stat[] = [
  { value: '40', unit: '+', label: 'Years of excellence' },
  { value: '30', unit: '+', label: 'Residences delivered' },
  { value: '5', unit: 'L+', label: 'Sq. ft. developed' },
  { value: '2', unit: 'K+', label: 'Families housed' },
]

export default function StatsBar({ stats }: Props) {
  const items = stats?.length ? stats : DEFAULT_STATS
  const [counts, setCounts] = useState<number[]>(() => items.map(() => 0))
  const barRef = useRef<HTMLDivElement | null>(null)

  const targets = useMemo(() => items.map((s) => Number.parseFloat(s.value) || 0), [items])

  useEffect(() => {
    setCounts(items.map(() => 0))
  }, [items])

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    let started = false
    const durations = 1200
    const stagger = 150
    const starts: number[] = []
    const rafIds: number[] = []

    const run = (index: number) => {
      const target = targets[index]
      const start = performance.now()
      starts[index] = start
      const tick = (now: number) => {
        const progress = Math.min(1, (now - starts[index]) / durations)
        const eased = 1 - Math.pow(1 - progress, 3)
        const value = target >= 10 ? Math.round(target * eased) : Number((target * eased).toFixed(1))
        setCounts((prev) => {
          const next = [...prev]
          next[index] = value
          return next
        })
        if (progress < 1) rafIds[index] = window.requestAnimationFrame(tick)
      }
      rafIds[index] = window.requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || started) return
        started = true
        targets.forEach((_, i) => window.setTimeout(() => run(i), i * stagger))
        io.disconnect()
      },
      { threshold: 0.35 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      rafIds.forEach((id) => window.cancelAnimationFrame(id))
    }
  }, [targets])

  return (
    <div className={styles.bar} ref={barRef} data-reveal data-reveal-stagger="true">
      {items.map((s, i) => (
        <div key={i} className={styles.stat}>
          <div className={styles.num}>
            {counts[i]}<span className={styles.unit}>{s.unit}</span>
          </div>
          <div className={styles.label}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}
