'use client'

import { useEffect, useMemo, useState } from 'react'
import type { IconicProjectCard } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'
import styles from './ResidencesSection.module.css'

interface Props {
  cards?: IconicProjectCard[]
}

const FALLBACK_CARDS: IconicProjectCard[] = [
  { _key: 'fallback-1', title: 'Moraj Palm Paradise', location: 'Navi Mumbai' },
  { _key: 'fallback-2', title: 'Moraj Riverside', location: 'Panvel' },
  { _key: 'fallback-3', title: 'Moraj Horizon', location: 'Kharghar' },
  { _key: 'fallback-4', title: 'Moraj Signature', location: 'Ulwe' },
  { _key: 'fallback-5', title: 'Moraj Bayview', location: 'Sanpada' },
  { _key: 'fallback-6', title: 'Moraj Skyline', location: 'Nerul' },
  { _key: 'fallback-7', title: 'Moraj Celestia', location: 'Seawoods' },
  { _key: 'fallback-8', title: 'Moraj Crown', location: 'Kamothe' },
]

const AUTO_SCROLL_MS = 5500

function cardImageSrc(card: IconicProjectCard): string | null {
  if (card.s3ImageUrl?.trim()) return card.s3ImageUrl.trim()
  if (card.imageUrl?.trim()) return card.imageUrl.trim()
  if (card.image) return urlFor(card.image).width(800).height(1000).fit('crop').url()
  return null
}

export default function ResidencesSectionClient({ cards = [] }: Props) {
  const [cardsPerView, setCardsPerView] = useState(4)
  const [startIndex, setStartIndex] = useState(0)
  const [autoEpoch, setAutoEpoch] = useState(0)
  const allCards = cards.length > 0 ? cards : FALLBACK_CARDS
  const canScroll = allCards.length > cardsPerView

  useEffect(() => {
    const apply = () => setCardsPerView(window.innerWidth <= 768 ? 2 : 4)
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  useEffect(() => {
    if (!canScroll || allCards.length === 0) return
    const id = window.setInterval(() => {
      setStartIndex((prev) => (prev + cardsPerView) % allCards.length)
    }, AUTO_SCROLL_MS)
    return () => window.clearInterval(id)
  }, [allCards.length, canScroll, cardsPerView, autoEpoch])

  const visibleCards = useMemo(() => {
    if (allCards.length === 0) return []
    return Array.from({ length: Math.min(cardsPerView, allCards.length) }, (_, i) => allCards[(startIndex + i) % allCards.length])
  }, [allCards, cardsPerView, startIndex])

  const moveCards = (direction: 'left' | 'right') => {
    if (!canScroll) return
    const nextIndex =
      direction === 'right'
        ? (startIndex + cardsPerView) % allCards.length
        : (startIndex - cardsPerView + allCards.length) % allCards.length
    setStartIndex(nextIndex)
    setAutoEpoch((v) => v + 1)
  }

  return (
    <section className={styles.section} id="residences" data-reveal data-reveal-stagger="true">
      <div className={styles.head}>
        <span className={styles.overline}>Our Presence</span>
        <h2 className={styles.h2}>Iconic Developments</h2>
      </div>

      <div className={styles.carouselWrap}>
        <div className={styles.grid}>
          {visibleCards.map((r, i) => (
            <div key={r._key ?? `${r.title}-${i}`} className={styles.tileCell}>
              <div className={styles.tile}>
                <div className={styles.imgWrap}>
                  {cardImageSrc(r) ? (
                    <img src={cardImageSrc(r)!} alt={r.title} className={styles.img} />
                  ) : (
                    <div className={styles.placeholder} />
                  )}
                </div>
                <div className={styles.caption}>
                  <span className={styles.name}>{r.title}</span>
                  <span className={styles.sep}>|</span>
                  <span className={styles.loc}>{r.location ? r.location.split(',')[0] : '—'}</span>
                </div>
                <span className={styles.tileAccent} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        {canScroll && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={() => moveCards('left')}
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={() => moveCards('right')}
              aria-label="Scroll right"
            >
              →
            </button>
          </>
        )}
      </div>

      <div className={styles.vaWrap}>
        <Link href="/residences" className={styles.vaBtn}>
          View All
        </Link>
      </div>
    </section>
  )
}

