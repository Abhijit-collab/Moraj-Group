 'use client'

import { useState } from 'react'
import type { IconicProjectCard } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import styles from './CompareResidencesSection.module.css'

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
]

const DETAIL_FALLBACKS = [
  { type: 'RESIDENTIAL', endDate: 'Jun 2031', rera: 'P51700052109', config: '3 & 4 BHK', area: '980 - 1540 sq.ft.' },
  { type: 'COMMERCIAL', endDate: 'Dec 2028', rera: 'P51700049320', config: 'Office Spaces', area: '1020 - 1625 sq.ft.' },
  { type: 'RESIDENTIAL', endDate: 'Jun 2030', rera: 'P51700055856', config: '2, 3, & 4 BHK', area: '990 - 1510 sq.ft.' },
  { type: 'RESIDENTIAL', endDate: 'Sep 2028', rera: 'P51700010177', config: '2 & 3 BHK', area: '1050 - 1680 sq.ft.' },
  { type: 'RESIDENTIAL', endDate: 'Dec 2028', rera: 'P51700011721', config: '2 & 3 BHK', area: '1010 - 1590 sq.ft.' },
  { type: 'RESIDENTIAL', endDate: 'Mar 2029', rera: 'P51700013866', config: '2 & 3 BHK', area: '1080 - 1710 sq.ft.' },
]

function cardImageSrc(card: IconicProjectCard): string | null {
  if (card.s3ImageUrl?.trim()) return card.s3ImageUrl.trim()
  if (card.imageUrl?.trim()) return card.imageUrl.trim()
  if (card.image) return urlFor(card.image).width(900).height(1100).fit('crop').url()
  return null
}

export default function CompareResidencesSection({ cards = [] }: Props) {
  const items = cards.length > 0 ? cards : FALLBACK_CARDS
  const splitIndex = Math.ceil(items.length / 2)
  const ongoingItems = items.slice(0, splitIndex)
  const completedItems = items.slice(splitIndex)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')
  const visibleItems = activeTab === 'upcoming' ? ongoingItems : completedItems

  return (
    <section className={styles.section} id="residences">
      <div className={styles.head}>
        <span className={styles.overline}>Our Presence</span>
        <h2 className={styles.h2}>Iconic Developments</h2>
      </div>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'upcoming' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'completed' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      <div className={styles.grid}>
        {visibleItems.map((card, i) => {
          const detailIndex = activeTab === 'upcoming' ? i : splitIndex + i
          const details = DETAIL_FALLBACKS[detailIndex % DETAIL_FALLBACKS.length]
          const src = cardImageSrc(card)
          return (
            <article
              key={card._key ?? `${activeTab}-${card.title}-${i}`}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <span className={styles.badge}>{details.type}</span>
                {src ? <img src={src} alt={card.title} className={styles.img} /> : <div className={styles.placeholder} />}
              </div>
              <div className={styles.caption}>
                <div className={styles.name}>{card.title}</div>
                <div className={styles.location}>{card.location ? card.location.split(',')[0] : '—'}</div>

                <div className={styles.meta}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaIcon}>▣</span>
                    <span>{details.config}</span>
                    <span className={styles.metaIcon}>◷</span>
                    <span>{details.endDate}</span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaIcon}>▤</span>
                    <span className={styles.reraWrap}>
                      <span className={styles.reraLabel}>RERA ID :</span>
                      <span className={styles.reraValue}>{details.rera}</span>
                    </span>
                    <span className={styles.metaIcon}>▧</span>
                    <span>{details.area}</span>
                  </div>
                </div>
              </div>
              <div className={styles.actions}>
                <a href="/residences" className={styles.btnPrimary}>View Details</a>
                <a href="/residences" className={styles.btnSecondary}>Download Brochure</a>
              </div>
              <a href="/residences" className={styles.cardOverlay} aria-label={`Open ${card.title} details`}>
                <span />
              </a>
            </article>
          )
        })}
      </div>

      {activeTab === 'completed' && completedItems.length === 0 && (
        <div className={styles.emptyState}>Completed projects will appear here soon.</div>
      )}
      {activeTab === 'upcoming' && ongoingItems.length === 0 && (
        <div className={styles.emptyState}>Upcoming projects will appear here soon.</div>
      )}
    </section>
  )
}

