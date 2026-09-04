'use client'

import { useMemo, useState } from 'react'
import type { IconicProjectCard } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import cardStyles from '@/components/compare/CompareResidencesSection.module.css'
import { creamBlurDataURL } from '@/lib/image-placeholder'
import { formatPropertyStatus } from '@/lib/format-property-status'
import styles from './page.module.css'

type TabKey = 'all' | 'upcoming' | 'ongoing' | 'completed'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
]

function cardImageSrc(card: IconicProjectCard): string | null {
  if (card.s3ImageUrl?.trim()) return card.s3ImageUrl.trim()
  if (card.imageUrl?.trim()) return card.imageUrl.trim()
  if (card.image) return urlFor(card.image).width(900).height(1100).fit('crop').url()
  return null
}

function detailsHref(card: IconicProjectCard): string {
  const slug = card.detailSlug?.trim()
  if (slug) return `/projects/${slug}`
  return '/residences'
}

const EMPTY_DETAIL = 'NOT AVAILABLE'

function cardDetails(card: IconicProjectCard) {
  return {
    statusLabel: card.status ? formatPropertyStatus(card.status) : '',
    config: card.configuration?.trim() || EMPTY_DETAIL,
    endDate: card.endDate?.trim() || EMPTY_DETAIL,
    rera: card.reraId?.trim() || EMPTY_DETAIL,
    area: card.area?.trim() || EMPTY_DETAIL,
  }
}

function isEmptyDetail(value: string) {
  return value === EMPTY_DETAIL
}

function filterCards(cards: IconicProjectCard[], tab: TabKey): IconicProjectCard[] {
  if (tab === 'all') return cards
  return cards.filter((card) => card.status === tab)
}

interface Props {
  cards: IconicProjectCard[]
}

export default function ResidencesListingClient({ cards }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const filteredCards = useMemo(() => filterCards(cards, activeTab), [cards, activeTab])

  if (cards.length === 0) {
    return <div className={styles.emptyState}>Properties will appear here soon.</div>
  }

  return (
    <div className={styles.listingWrap}>
      <div className={cardStyles.tabs}>
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`${cardStyles.tab} ${activeTab === key ? cardStyles.tabActive : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredCards.length > 0 ? (
        <div className={`${cardStyles.grid} ${styles.cardsGrid}`}>
          {filteredCards.map((card, index) => {
            const details = cardDetails(card)
            const src = cardImageSrc(card)
            const href = detailsHref(card)
            return (
              <article key={card._key ?? `${card.title}-${index}`} className={cardStyles.card}>
                <div className={cardStyles.imageWrap}>
                  {details.statusLabel ? (
                    <span className={cardStyles.badge}>{details.statusLabel}</span>
                  ) : null}
                  {src ? (
                    <Image
                      src={src}
                      alt={card.title}
                      fill
                      priority={index === 0 && activeTab === 'all'}
                      placeholder="blur"
                      blurDataURL={creamBlurDataURL}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={cardStyles.img}
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className={cardStyles.placeholder} />
                  )}
                </div>
                <div className={cardStyles.caption}>
                  <div className={cardStyles.name}>{card.title}</div>
                  <div className={cardStyles.location}>{card.location ? card.location.split(',')[0] : '—'}</div>

                  <div className={cardStyles.meta}>
                    <div className={cardStyles.metaRow}>
                      <span className={cardStyles.metaIcon}>▣</span>
                      <span className={isEmptyDetail(details.config) ? cardStyles.metaEmpty : undefined}>
                        {details.config}
                      </span>
                      <span className={cardStyles.metaIcon}>◷</span>
                      <span className={isEmptyDetail(details.endDate) ? cardStyles.metaEmpty : undefined}>
                        {details.endDate}
                      </span>
                    </div>
                    <div className={cardStyles.metaRow}>
                      <span className={cardStyles.metaIcon}>▤</span>
                      <span className={cardStyles.reraWrap}>
                        <span className={cardStyles.reraLabel}>RERA ID :</span>
                        <span
                          className={`${cardStyles.reraValue}${isEmptyDetail(details.rera) ? ` ${cardStyles.metaEmpty}` : ''}`}
                        >
                          {details.rera}
                        </span>
                      </span>
                      <span className={cardStyles.metaIcon}>▧</span>
                      <span className={isEmptyDetail(details.area) ? cardStyles.metaEmpty : undefined}>
                        {details.area}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={cardStyles.actions}>
                  <a href={href} className={cardStyles.btnPrimary}>View Details</a>
                  <a href="/residences" className={cardStyles.btnSecondary}>Download Brochure</a>
                </div>
                <a href={href} className={cardStyles.cardOverlay} aria-label={`Open ${card.title} details`}>
                  <span />
                </a>
              </article>
            )
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          {activeTab === 'all'
            ? 'Properties will appear here soon.'
            : `${TABS.find((t) => t.key === activeTab)?.label} projects will appear here soon.`}
        </div>
      )}
    </div>
  )
}
