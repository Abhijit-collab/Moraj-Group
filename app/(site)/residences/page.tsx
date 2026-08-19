import Footer from '@/components/sections/Footer'
import { getSanityClient, isSanityConfigured, urlFor } from '@/lib/sanity'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import { iconicProjectsContentQuery, siteSettingsQuery } from '@/lib/queries'
import type { IconicProjectCard, IconicProjectsContent, SiteSettings } from '@/lib/types'
import type { Metadata } from 'next'
import cardStyles from '@/components/compare/CompareResidencesSection.module.css'
import compareStyles from '../compare/compare.module.css'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'All Properties',
  description: 'Explore all Moraj Group residences across Navi Mumbai — Panvel, Kharghar, Ulwe and Sanpada.',
}

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

function detailsHref(card: IconicProjectCard): string {
  if (card.detailSlug?.trim()) return `/projects/${card.detailSlug.trim()}`
  return '/residences'
}

function cardDetails(card: IconicProjectCard, fallback: (typeof DETAIL_FALLBACKS)[number]) {
  return {
    type: card.propertyType?.trim() || fallback.type,
    endDate: card.endDate?.trim() || fallback.endDate,
    rera: card.reraId?.trim() || fallback.rera,
    config: card.configuration?.trim() || fallback.config,
    area: card.area?.trim() || fallback.area,
  }
}

export default async function ResidencesPage() {
  const [iconicProjectsContent, settings] = isSanityConfigured
    ? await Promise.all([
        getSanityClient().fetch<IconicProjectsContent | null>(iconicProjectsContentQuery),
        getSanityClient().fetch<SiteSettings>(siteSettingsQuery),
      ])
    : [null, devHomepageContent.settings]
  const cards = iconicProjectsContent?.cards ?? []

  return (
    <div className={`${compareStyles.compareTheme} ${styles.page}`}>
      <div className={styles.header}>
        <span className={styles.overline}>Our Presence</span>
        <h1 className={styles.h1}>All Properties</h1>
      </div>

      {cards.length > 0 ? (
        <div className={`${cardStyles.grid} ${styles.cardsGrid}`}>
          {cards.map((card, index) => {
            const details = cardDetails(card, DETAIL_FALLBACKS[index % DETAIL_FALLBACKS.length])
            const src = cardImageSrc(card)
            const href = detailsHref(card)
            return (
              <article key={card._key ?? `${card.title}-${index}`} className={cardStyles.card}>
                <div className={cardStyles.imageWrap}>
                  <span className={cardStyles.badge}>{details.type}</span>
                  {src ? <img src={src} alt={card.title} className={cardStyles.img} /> : <div className={cardStyles.placeholder} />}
                </div>
                <div className={cardStyles.caption}>
                  <div className={cardStyles.name}>{card.title}</div>
                  <div className={cardStyles.location}>{card.location ? card.location.split(',')[0] : '—'}</div>

                  <div className={cardStyles.meta}>
                    <div className={cardStyles.metaRow}>
                      <span className={cardStyles.metaIcon}>▣</span>
                      <span>{details.config}</span>
                      <span className={cardStyles.metaIcon}>◷</span>
                      <span>{details.endDate}</span>
                    </div>
                    <div className={cardStyles.metaRow}>
                      <span className={cardStyles.metaIcon}>▤</span>
                      <span className={cardStyles.reraWrap}>
                        <span className={cardStyles.reraLabel}>RERA ID :</span>
                        <span className={cardStyles.reraValue}>{details.rera}</span>
                      </span>
                      <span className={cardStyles.metaIcon}>▧</span>
                      <span>{details.area}</span>
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
        <div className={styles.emptyState}>Properties will appear here soon.</div>
      )}
      <Footer settings={settings} />
    </div>
  )
}
