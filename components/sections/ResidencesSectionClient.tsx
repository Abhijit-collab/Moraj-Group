'use client'

import { useState } from 'react'
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

function cardImageSrc(card: IconicProjectCard): string | null {
  if (card.s3ImageUrl?.trim()) return card.s3ImageUrl.trim()
  if (card.imageUrl?.trim()) return card.imageUrl.trim()
  if (card.image) return urlFor(card.image).width(800).height(1000).fit('crop').url()
  return null
}

export default function ResidencesSectionClient({ cards = [] }: Props) {
  const baseItems = cards.length > 0 ? cards : FALLBACK_CARDS
  const items = [...baseItems, ...baseItems]
  const durationSec = Math.max(28, Math.round(baseItems.length * 6.5))
  const [direction, setDirection] = useState<'normal' | 'reverse'>('normal')

  return (
    <section className={styles.section} id="residences" data-reveal data-reveal-stagger="true">
      <div className={styles.head}>
        <span className={styles.overline}>Our Presence</span>
        <h2 className={styles.h2}>Iconic Developments</h2>
      </div>

      <div className={styles.carouselWrap}>
        <div className={styles.viewport}>
          <div className={styles.track} style={{ animationDuration: `${durationSec}s`, animationDirection: direction }}>
            {items.map((r, i) => (
              <div key={`${r._key ?? r.title}-${i}`} className={styles.tileCell}>
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
        </div>
        <div className={styles.mobileArrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => setDirection('reverse')}
            aria-label="Move carousel left"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => setDirection('normal')}
            aria-label="Move carousel right"
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.vaWrap}>
        <Link href="/residences" className={styles.vaBtn}>
          View All
        </Link>
      </div>
    </section>
  )
}

