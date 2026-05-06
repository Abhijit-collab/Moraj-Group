'use client'

import { useEffect } from 'react'

export default function ScrollRevealObserver() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (targets.length === 0) return

    for (const el of targets) {
      if (el.dataset.revealStagger === 'true') {
        Array.from(el.children).forEach((child, index) => {
          ;(child as HTMLElement).style.setProperty('--reveal-index', String(index))
        })
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.dataset.revealed = 'true'
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    )

    for (const el of targets) io.observe(el)

    return () => io.disconnect()
  }, [])

  return null
}
