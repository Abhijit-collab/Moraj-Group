'use client'

import { useEffect, useState } from 'react'
import type { IconicProjectCard } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import styles from './CompareResidencesSection.module.css'
import { formatPropertyStatus } from '@/lib/format-property-status'
import { sortByCompletionYearDesc } from '@/lib/sort-project-cards'
import ProjectCardMedia from '@/components/ui/ProjectCardMedia'

interface Props {
  cards?: IconicProjectCard[]
  brandLogoSrc?: string
}

const FALLBACK_CARDS: IconicProjectCard[] = [
  { _key: 'fallback-1', title: 'Moraj Palm Paradise', location: 'Navi Mumbai' },
  { _key: 'fallback-2', title: 'Moraj Riverside', location: 'Panvel' },
  { _key: 'fallback-3', title: 'Moraj Horizon', location: 'Kharghar' },
  { _key: 'fallback-4', title: 'Moraj Signature', location: 'Ulwe' },
  { _key: 'fallback-5', title: 'Moraj Bayview', location: 'Sanpada' },
  { _key: 'fallback-6', title: 'Moraj Skyline', location: 'Nerul' },
]

const CARDS_PER_SLIDE = 3
type TabKey = 'upcoming' | 'ongoing' | 'completed'

function cardImageSrc(card: IconicProjectCard): string | null {
  if (card.s3ImageUrl?.trim()) return card.s3ImageUrl.trim()
  if (card.imageUrl?.trim()) return card.imageUrl.trim()
  if (card.image) return urlFor(card.image).width(1200).height(975).fit('crop').url()
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

export default function CompareResidencesSection({ cards = [], brandLogoSrc }: Props) {
  const items = cards.length > 0 ? cards : FALLBACK_CARDS
  const hasAnyStatus = items.some(
    (item) => item.status === 'upcoming' || item.status === 'ongoing' || item.status === 'completed'
  )
  const third = Math.ceil(items.length / 3)
  const upcomingItems = sortByCompletionYearDesc(
    hasAnyStatus ? items.filter((item) => item.status === 'upcoming') : items.slice(0, third)
  )
  const ongoingItems = sortByCompletionYearDesc(
    hasAnyStatus ? items.filter((item) => item.status === 'ongoing') : items.slice(third, third * 2)
  )
  const completedItems = sortByCompletionYearDesc(
    hasAnyStatus ? items.filter((item) => item.status === 'completed') : items.slice(third * 2)
  )
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
                    const details = cardDetails(card)
                    const src = cardImageSrc(card)
                    const href = detailsHref(card)
                    const isCompleted = card.status === 'completed'
                    return (
                      <article
                        key={card._key ?? `${activeTab}-${card.title}-${slideIndex}-${i}`}
                        className={`${styles.card}${isCompleted ? ` ${styles.cardStatic}` : ''}`}
                      >
                        <div className={styles.imageWrap}>
                          {details.statusLabel ? (
                            <span className={styles.badge}>{details.statusLabel}</span>
                          ) : null}
                          <ProjectCardMedia
                            src={src}
                            brandLogoSrc={brandLogoSrc}
                            alt={card.title}
                            priority={slideIndex === 0 && i === 0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            imageClassName={styles.img}
                          />
                        </div>
                        <div className={styles.caption}>
                          <div className={styles.name}>{card.title}</div>
                          <div className={styles.location}>{card.location ? card.location.split(',')[0] : '—'}</div>

                          <div className={styles.meta}>
                            <div className={styles.metaRow}>
                              <span className={styles.metaIcon}>▣</span>
                              <span className={isEmptyDetail(details.config) ? styles.metaEmpty : undefined}>
                                {details.config}
                              </span>
                              <span className={styles.metaIcon}>◷</span>
                              <span className={isEmptyDetail(details.endDate) ? styles.metaEmpty : undefined}>
                                {details.endDate}
                              </span>
                            </div>
                            <div className={styles.metaRow}>
                              <span className={styles.metaIcon}>▤</span>
                              <span className={styles.reraWrap}>
                                <span className={styles.reraLabel}>RERA ID :</span>
                                <span
                                  className={`${styles.reraValue}${isEmptyDetail(details.rera) ? ` ${styles.metaEmpty}` : ''}`}
                                >
                                  {details.rera}
                                </span>
                              </span>
                              <span className={styles.metaIcon}>▧</span>
                              <span className={isEmptyDetail(details.area) ? styles.metaEmpty : undefined}>
                                {details.area}
                              </span>
                            </div>
                          </div>
                        </div>
                        {!isCompleted && (
                          <>
                            <div className={styles.actions}>
                              <a href={href} className={styles.btnPrimary}>View Details</a>
                              <a href="/residences" className={styles.btnSecondary}>Download Brochure</a>
                            </div>
                            <a href={href} className={styles.cardOverlay} aria-label={`Open ${card.title} details`}>
                              <span />
                            </a>
                          </>
                        )}
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

