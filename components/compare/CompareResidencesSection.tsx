'use client'

import { useEffect, useState } from 'react'
import type { IconicProjectCard } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import styles from './CompareResidencesSection.module.css'
import { creamBlurDataURL } from '@/lib/image-placeholder'
import { formatPropertyStatus } from '@/lib/format-property-status'

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
  { status: 'upcoming' as const, endDate: 'Jun 2031', rera: 'P51700052109', config: '3 & 4 BHK', area: '980 - 1540 sq.ft.' },
  { status: 'ongoing' as const, endDate: 'Dec 2028', rera: 'P51700049320', config: 'Office Spaces', area: '1020 - 1625 sq.ft.' },
  { status: 'completed' as const, endDate: 'Jun 2030', rera: 'P51700055856', config: '2, 3, & 4 BHK', area: '990 - 1510 sq.ft.' },
  { status: 'upcoming' as const, endDate: 'Sep 2028', rera: 'P51700010177', config: '2 & 3 BHK', area: '1050 - 1680 sq.ft.' },
  { status: 'ongoing' as const, endDate: 'Dec 2028', rera: 'P51700011721', config: '2 & 3 BHK', area: '1010 - 1590 sq.ft.' },
  { status: 'completed' as const, endDate: 'Mar 2029', rera: 'P51700013866', config: '2 & 3 BHK', area: '1080 - 1710 sq.ft.' },
]

const CARDS_PER_SLIDE = 3
type TabKey = 'upcoming' | 'ongoing' | 'completed'

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

function cardDetails(card: IconicProjectCard, fallback: (typeof DETAIL_FALLBACKS)[number]) {
  return {
    statusLabel: formatPropertyStatus(card.status || fallback.status),
    endDate: card.endDate?.trim() || fallback.endDate,
    rera: card.reraId?.trim() || fallback.rera,
    config: card.configuration?.trim() || fallback.config,
    area: card.area?.trim() || fallback.area,
  }
}

export default function CompareResidencesSection({ cards = [] }: Props) {
  const items = cards.length > 0 ? cards : FALLBACK_CARDS
  const hasAnyStatus = items.some(
    (item) => item.status === 'upcoming' || item.status === 'ongoing' || item.status === 'completed'
  )
  const third = Math.ceil(items.length / 3)
  const upcomingItems = hasAnyStatus
    ? items.filter((item) => item.status === 'upcoming')
    : items.slice(0, third)
  const ongoingItems = hasAnyStatus
    ? items.filter((item) => item.status === 'ongoing')
    : items.slice(third, third * 2)
  const completedItems = hasAnyStatus
    ? items.filter((item) => item.status === 'completed')
    : items.slice(third * 2)
  const tabItems: Record<TabKey, IconicProjectCard[]> = {
    upcoming: upcomingItems,
    ongoing: ongoingItems,
    completed: completedItems,
  }
  const [activeTab, setActiveTab] = useState<TabKey>('upcoming')
  const [activeSlide, setActiveSlide] = useState(0)
  const visibleItems = tabItems[activeTab]
  const slideCount = Math.max(1, Math.ceil(visibleItems.length / CARDS_PER_SLIDE))
  const slides = Array.from({ length: slideCount }, (_, slideIndex) =>
    visibleItems.slice(slideIndex * CARDS_PER_SLIDE, slideIndex * CARDS_PER_SLIDE + CARDS_PER_SLIDE)
  ).filter((slide) => slide.length > 0)
  const totalSlides = Math.max(1, slides.length)
  const currentSlide = Math.min(activeSlide, totalSlides - 1)
  const canGoPrev = currentSlide > 0
  const canGoNext = currentSlide < totalSlides - 1

  useEffect(() => {
    setActiveSlide(0)
  }, [activeTab])

  useEffect(() => {
    // Stay on the last valid page (keeps ← enabled); do not jump back to page 1
    if (activeSlide > totalSlides - 1) {
      setActiveSlide(Math.max(0, totalSlides - 1))
    }
  }, [activeSlide, totalSlides])

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
          className={`${styles.tab} ${activeTab === 'ongoing' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'completed' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      <div className={styles.carousel}>
        <div className={styles.carouselViewport}>
          <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, slideIndex) => (
              <div className={styles.carouselSlide} key={`${activeTab}-slide-${slideIndex}`}>
                <div className={styles.carouselGrid}>
                  {slide.map((card, i) => {
                    const originalIndex = visibleItems.indexOf(card)
                    const detailIndex = hasAnyStatus
                      ? originalIndex
                      : activeTab === 'upcoming'
                        ? originalIndex
                        : activeTab === 'ongoing'
                          ? third + originalIndex
                          : third * 2 + originalIndex
                    const details = cardDetails(card, DETAIL_FALLBACKS[detailIndex % DETAIL_FALLBACKS.length])
                    const src = cardImageSrc(card)
                    const href = detailsHref(card)
                    return (
                      <article
                        key={card._key ?? `${activeTab}-${card.title}-${slideIndex}-${i}`}
                        className={styles.card}
                      >
                        <div className={styles.imageWrap}>
                          <span className={styles.badge}>{details.statusLabel}</span>
                          {src ? (
                            <Image
                              src={src}
                              alt={card.title}
                              fill
                              priority={slideIndex === 0 && i === 0}
                              placeholder="blur"
                              blurDataURL={creamBlurDataURL}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className={styles.img}
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <div className={styles.placeholder} />
                          )}
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
                          <a href={href} className={styles.btnPrimary}>View Details</a>
                          <a href="/residences" className={styles.btnSecondary}>Download Brochure</a>
                        </div>
                        <a href={href} className={styles.cardOverlay} aria-label={`Open ${card.title} details`}>
                          <span />
                        </a>
                      </article>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalSlides > 1 && (
          <div className={styles.carouselNav} aria-label="Iconic developments carousel navigation">
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={() => setActiveSlide((s) => Math.max(0, s - 1))}
              disabled={!canGoPrev}
              aria-label="Previous projects"
            >
              ←
            </button>
            <span className={styles.carouselPage} aria-live="polite">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={() => setActiveSlide((s) => Math.min(totalSlides - 1, s + 1))}
              disabled={!canGoNext}
              aria-label="Next projects"
            >
              →
            </button>
          </div>
        )}
      </div>

      {activeTab === 'completed' && completedItems.length === 0 && (
        <div className={styles.emptyState}>Completed projects will appear here soon.</div>
      )}
      {activeTab === 'ongoing' && ongoingItems.length === 0 && (
        <div className={styles.emptyState}>Ongoing projects will appear here soon.</div>
      )}
      {activeTab === 'upcoming' && upcomingItems.length === 0 && (
        <div className={styles.emptyState}>Upcoming projects will appear here soon.</div>
      )}
      <div className={styles.viewAllWrap}>
        <a href="/residences" className={styles.viewAllLink}>View all Properties</a>
      </div>
    </section>
  )
}

