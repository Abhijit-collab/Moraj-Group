 'use client'

import { useEffect, useRef } from 'react'
import type { Testimonial } from '@/lib/types'
import styles from './TestimonialsSection.module.css'

interface Props { testimonials: Testimonial[] }

export default function TestimonialsSection({ testimonials }: Props) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const repeatCount = 6
  const fallbackItems: Testimonial[] = [
    {
      _id: 'fallback-testimonial-1',
      quote:
        'From possession timelines to final handover quality, Moraj delivered exactly what they promised.',
      name: 'A. Mehta',
      residence: 'Moraj Riverside',
      location: 'Navi Mumbai',
      rating: 5,
    },
    {
      _id: 'fallback-testimonial-2',
      quote:
        'The planning, ventilation, and finishing quality made us feel confident from day one.',
      name: 'P. Kulkarni',
      residence: 'Moraj Palm Paradise',
      location: 'Panvel',
      rating: 5,
    },
    {
      _id: 'fallback-testimonial-3',
      quote:
        'Professional team, transparent communication, and a home that truly feels thoughtfully designed.',
      name: 'R. Shah',
      residence: 'Moraj Signature',
      location: 'Kharghar',
      rating: 5,
    },
  ]
  const baseItems = testimonials.length > 0 ? testimonials : fallbackItems
  const items = Array.from({ length: repeatCount }, () => baseItems).flat()

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let rafId = 0
    let lastTs = 0
    const pxPerSecond = 48
    const step = (ts: number) => {
      if (!lastTs) lastTs = ts
      const delta = ts - lastTs
      lastTs = ts

      const loopWidth = track.scrollWidth / repeatCount
      if (loopWidth > 0) {
        if (!pausedRef.current) {
          offsetRef.current += (pxPerSecond * delta) / 1000
        }
        if (offsetRef.current >= loopWidth) offsetRef.current -= loopWidth
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }

      rafId = window.requestAnimationFrame(step)
    }

    rafId = window.requestAnimationFrame(step)
    return () => {
      window.cancelAnimationFrame(rafId)
      offsetRef.current = 0
      track.style.transform = 'translate3d(0, 0, 0)'
    }
  }, [items.length, repeatCount])

  const scrollByCards = (direction: 'prev' | 'next') => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const amount = Math.max(280, Math.round(viewport.clientWidth * 0.82))
    const loopWidth = track.scrollWidth / repeatCount
    let nextOffset = direction === 'next' ? offsetRef.current + amount : offsetRef.current - amount
    if (loopWidth > 0) {
      while (nextOffset < 0) nextOffset += loopWidth
      while (nextOffset >= loopWidth) nextOffset -= loopWidth
    }
    offsetRef.current = nextOffset
    track.style.transform = `translate3d(${-nextOffset}px, 0, 0)`
  }

  return (
    <section className={styles.section} data-reveal data-reveal-stagger="true">
      <div className={styles.label}>
        <div className={styles.labelRule} />
        Resident Voices
      </div>
      <h2 className={styles.h2}>
        Homes that speak<br />for <em>themselves</em>
      </h2>
      <div className={styles.carousel}>
        <div
          className={styles.viewport}
          ref={viewportRef}
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          <div className={styles.track} ref={trackRef}>
            {items.map((t, i) => (
              <div key={`${t._id}-${i}`} className={styles.card}>
                <span className={styles.qm}>&ldquo;</span>
                <p className={styles.quote}>{t.quote}</p>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.loc}>{t.residence}{t.location ? `, ${t.location}` : ''}</div>
                <div className={styles.stars}>{'★'.repeat(t.rating ?? 5)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous testimonial"
            onClick={() => scrollByCards('prev')}
          >
            &#8592;
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next testimonial"
            onClick={() => scrollByCards('next')}
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  )
}
