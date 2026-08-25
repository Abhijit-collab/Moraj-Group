import { notFound } from 'next/navigation'
import { getSanityClient, isSanityConfigured, urlFor } from '@/lib/sanity'
import { allProjectDetailSlugsQuery, projectDetailBySlugQuery, siteSettingsQuery } from '@/lib/queries'
import type { ProjectDetail, ProjectDetailFloorPlan, SiteSettings } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import FloorPlansLightbox from './FloorPlansLightbox'
import ProjectEnquireForm from './ProjectEnquireForm'
import { creamBlurDataURL, darkBlurDataURL } from '@/lib/image-placeholder'
import compareStyles from '../../compare/compare.module.css'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const revalidate = 60
export const dynamicParams = true

interface Props {
  params: { slug: string }
}

const KNOWN_PROJECTS: Record<string, string> = {
  'moraj-opulence': 'Moraj Opulence',
  'moraj-pride': 'Moraj Pride',
  'moraj-prive': 'Moraj Prive',
  'moraj-eternal': 'Moraj Eternal',
  'moraj-jewel-crest': 'Moraj Jewel Crest',
  'jewel-crest': 'Moraj Jewel Crest',
  'moraj-mountain-view': 'Moraj Mountain View',
  'moraj-riverside-park': 'Moraj Riverside Park',
  'moraj-waterfall-gateway': 'Moraj Waterfall Gateway',
  'moraj-waterfall-gateway-phase-2': 'Moraj Waterfall Gateway Phase 2',
  'moraj-silent-valley': 'Moraj Silent Valley',
  'moraj-woods-nagpur': 'Moraj Woods Nagpur',
  'maa-smriti-maa-shristi': 'Maa Smriti & Maa Shristi',
}

const PROJECT_FALLBACKS = {
  heroSubtitle: '3 & 4 BHK Residences',
  heroAddress: 'Panvel, Navi Mumbai',
  heroPrimaryCtaLabel: 'Book a Site Visit',
  heroPrimaryCtaHref: '#enquire',
  heroSecondaryCtaLabel: 'Download Brochure',
  heroSecondaryCtaHref: '#',
  galleryHero: 'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&fit=crop&w=1200&q=80',
  galleryThumbs: [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
  ],
  galleryMoreText: '+ 16 more photos',
  specCards: [
    { value: '3 & 4 BHK', label: 'Configuration' },
    { value: '980 - 1540', label: 'sq.ft.' },
    { value: 'Jun 2031', label: 'Possession' },
    { value: '28', label: 'Floors' },
    { value: '240', label: 'Units' },
    { value: 'Ready', label: 'to enquire' },
  ],
  description:
    'This Moraj residence is designed for spacious, elegant family living, with premium finishes and thoughtful planning throughout the home.',
  locationHighlights: [
    { title: 'Panvel Station', value: '1.2 km' },
    { title: 'NMIA', value: '9 km' },
    { title: 'Mumbai-Pune Expy', value: '2.5 km' },
  ],
  amenities: ['Swimming Pool', 'Gymnasium', 'Clubhouse', 'Children Play Area', 'Jogging Track', 'Indoor Games', 'Yoga Deck', 'Multipurpose Hall'],
  floorPlans: [{ label: 'Type A | 980 sq.ft.' }, { label: 'Type B | 1540 sq.ft.' }] as ProjectDetailFloorPlan[],
  price: '₹ 1.85 Cr',
  priceMeta: ['3 & 4 BHK', '980 - 1540 sq.ft.', 'Jun 2031', 'New Launch'],
  reraId: '—',
}

export async function generateStaticParams() {
  const known = Object.keys(KNOWN_PROJECTS).map((slug) => ({ slug }))
  if (!isSanityConfigured) return known
  try {
    const slugs = await getSanityClient().fetch<{ slug: string }[]>(allProjectDetailSlugsQuery)
    const cms = (slugs ?? []).filter((s) => s?.slug).map((s) => ({ slug: s.slug }))
    const merged = new Map([...known, ...cms].map((item) => [item.slug, item]))
    return Array.from(merged.values())
  } catch {
    return known
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSanityConfigured) {
    return { title: `${KNOWN_PROJECTS[params.slug] ?? 'Project'} | Moraj Group` }
  }
  const project = await getSanityClient().fetch<ProjectDetail | null>(projectDetailBySlugQuery, { slug: params.slug })
  return {
    title: project?.projectName
      ? `${project.projectName} | Moraj Group`
      : `${KNOWN_PROJECTS[params.slug] ?? 'Project'} | Moraj Group`,
    description: project?.description ?? PROJECT_FALLBACKS.description,
  }
}

function parseMapEmbedSrc(raw?: string): string {
  if (!raw) return ''
  const trimmed = raw.trim()
  if (!trimmed) return ''
  const iframeSrcMatch = trimmed.match(/src\s*=\s*["']([^"']+)["']/i)
  if (iframeSrcMatch?.[1]) return iframeSrcMatch[1]
  return trimmed
}

function getAmenityIcon(label: string): string {
  const value = label.toLowerCase()
  if (value.includes('gym')) return '🏋️'
  if (value.includes('pool')) return '🏊'
  if (value.includes('club')) return '🏛️'
  if (value.includes('children') || value.includes('play')) return '🛝'
  if (value.includes('jog') || value.includes('track')) return '🏃'
  if (value.includes('indoor') || value.includes('games')) return '🎯'
  if (value.includes('yoga')) return '🧘'
  if (value.includes('hall')) return '🏢'
  return '◆'
}

export default async function ProjectDetailPage({ params }: Props) {
  const knownTitle = KNOWN_PROJECTS[params.slug]
  const fb = PROJECT_FALLBACKS

  if (!isSanityConfigured) {
    if (!knownTitle) notFound()
  }

  const [settings, project] = isSanityConfigured
    ? await Promise.all([
        getSanityClient().fetch<SiteSettings>(siteSettingsQuery),
        getSanityClient().fetch<ProjectDetail | null>(projectDetailBySlugQuery, { slug: params.slug }),
      ])
    : [null, null]

  if (!project && !knownTitle) notFound()

  const title = project?.projectName || knownTitle || 'Project'
  const heroSubtitle = project?.heroSubtitle || fb.heroSubtitle
  const heroAddress = project?.heroAddress || fb.heroAddress
  const heroPrimaryCtaLabel = project?.heroPrimaryCtaLabel || fb.heroPrimaryCtaLabel
  const heroPrimaryCtaHref = project?.heroPrimaryCtaHref || fb.heroPrimaryCtaHref
  const heroSecondaryCtaLabel = project?.heroSecondaryCtaLabel || fb.heroSecondaryCtaLabel
  const heroSecondaryCtaHref = project?.heroSecondaryCtaHref || fb.heroSecondaryCtaHref
  const heroBg = project?.heroBackgroundUrl || project?.heroBackgroundMediaUrl || ''
  const galleryFromList = (project?.galleryImages ?? [])
    .map((img) => img.imageUrl?.trim() || img.uploadUrl?.trim() || '')
    .filter(Boolean)
  const galleryFromThumbs =
    project?.galleryThumbs && project.galleryThumbs.length > 0
      ? project.galleryThumbs.map((img) => urlFor(img).width(600).height(260).fit('crop').url())
      : []
  const galleryUrls = Array.from(
    new Set([project?.galleryHeroImageUrl?.trim() || '', ...galleryFromList, ...galleryFromThumbs].filter(Boolean))
  )
  const galleryHero = galleryUrls[0] || fb.galleryHero
  const galleryThumbs = galleryUrls.length > 1 ? galleryUrls.slice(1, 3) : fb.galleryThumbs
  const extraCount = Math.max(0, galleryUrls.length - 3)
  const galleryMoreText =
    extraCount > 0
      ? (project?.galleryMoreText || `+ ${extraCount} more photos`)
      : (project?.galleryMoreText || fb.galleryMoreText)
  const specCards = project?.specCards?.length ? project.specCards : fb.specCards
  const description = project?.description || fb.description
  const locationHighlights = project?.locationHighlights?.length ? project.locationHighlights : fb.locationHighlights
  const amenities = project?.amenities?.length ? project.amenities : fb.amenities
  const floorPlans = project?.floorPlans?.length ? project.floorPlans : fb.floorPlans
  const floorPlansWithImages = floorPlans
    .map((plan) => {
      const imageUrl = plan.imageUrl || (plan.image ? urlFor(plan.image).width(1200).fit('max').url() : '')
      return { label: plan.label ?? 'Floor Plan', imageUrl }
    })
    .filter((plan) => Boolean(plan.imageUrl))
  const price = project?.price || fb.price
  const priceMeta = project?.priceMeta?.length ? project.priceMeta : fb.priceMeta
  const reraId = project?.reraId || fb.reraId
  const enquireHeading = project?.enquireHeading || `Interested in ${title}?`
  const mapSrc = parseMapEmbedSrc(project?.mapEmbedCode || project?.mapEmbedUrl)

  return (
    <div className={compareStyles.compareTheme}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroSplit}>
            <div className={styles.heroInner}>
              <h1 className={styles.heroTitle}>{title}</h1>
              {heroSubtitle && <div className={styles.heroSubtitle}>{heroSubtitle}</div>}
              {heroAddress && <div className={styles.heroAddress}>{heroAddress}</div>}
              <div className={styles.heroRera}>Rera ID : {reraId}</div>
              <div className={styles.heroActions}>
                <Link href={heroPrimaryCtaHref} className={styles.heroBtnPrimary}>{heroPrimaryCtaLabel}</Link>
                <Link href={heroSecondaryCtaHref} className={styles.heroBtnSecondary}>{heroSecondaryCtaLabel}</Link>
              </div>
            </div>
            <div className={styles.heroMedia}>
              {heroBg ? (
                <Image
                  src={heroBg}
                  alt={`${title} render`}
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={darkBlurDataURL}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover', objectPosition: 'center 58%' }}
                />
              ) : null}
            </div>
          </div>
        </section>

        <section className={styles.contentWrap}>
          <div className={styles.leftCol}>
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/residences">Residences</Link>
              <span>/</span>
              <span>{title}</span>
            </div>
            {price && (
              <div className={styles.mobilePriceCard}>
                <div className={styles.price}>{price}</div>
                <div className={styles.priceMeta}>
                  {priceMeta.map((item, i) => <span key={`mobile-${item}-${i}`}>{item}</span>)}
                </div>
              </div>
            )}
            <div className={styles.sectionNav}>
              {galleryHero && <a href="#gallery">Gallery</a>}
              {description && <a href="#description">Description</a>}
              {(mapSrc || locationHighlights.length > 0) && <a href="#location">Location</a>}
              {amenities.length > 0 && <a href="#amenities">Amenities</a>}
              {floorPlans.length > 0 && <a href="#floor-plans">Floor Plan</a>}
            </div>

            {galleryHero && (
              <>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Gallery</h2>
                </div>
                <div id="gallery" className={styles.galleryHero}>
                  <Image
                    src={galleryHero}
                    alt={`${title} gallery`}
                    fill
                    placeholder="blur"
                    blurDataURL={creamBlurDataURL}
                    sizes="(max-width: 900px) 100vw, 720px"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
                {galleryThumbs.length > 0 && (
                  <div className={styles.thumbRow}>
                    {galleryThumbs[0] && (
                      <div className={styles.thumb}>
                        <Image
                          src={galleryThumbs[0]}
                          alt={`${title} gallery thumbnail 1`}
                          fill
                          placeholder="blur"
                          blurDataURL={creamBlurDataURL}
                          sizes="240px"
                          style={{ objectFit: 'cover', objectPosition: 'center' }}
                        />
                      </div>
                    )}
                    {galleryThumbs[1] && (
                      <div className={styles.thumb}>
                        <Image
                          src={galleryThumbs[1]}
                          alt={`${title} gallery thumbnail 2`}
                          fill
                          placeholder="blur"
                          blurDataURL={creamBlurDataURL}
                          sizes="240px"
                          style={{ objectFit: 'cover', objectPosition: 'center' }}
                        />
                      </div>
                    )}
                    {galleryMoreText && <div className={styles.thumbMore}>{galleryMoreText}</div>}
                  </div>
                )}
              </>
            )}

            {specCards.length > 0 && (
              <div className={styles.specGrid}>
                {specCards.map((spec, i) => (
                  <div key={`${spec.value}-${i}`} className={styles.specCard}>
                    <span>{spec.value}</span>
                    <small>{spec.label}</small>
                  </div>
                ))}
              </div>
            )}

            {description && (
              <div id="description" className={styles.section}>
                <h2 className={styles.sectionTitle}>Description</h2>
                <p>{description}</p>
              </div>
            )}

            {(mapSrc || locationHighlights.length > 0) && (
              <div id="location" className={styles.section}>
                <h2 className={styles.sectionTitle}>Location</h2>
                {mapSrc ? (
                  <iframe className={styles.mapBlock} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                ) : (
                  <div className={styles.mapBlock} />
                )}
                {locationHighlights.length > 0 && (
                  <div className={styles.locStats}>
                    {locationHighlights.map((loc, i) => (
                      <div key={`${loc.title}-${i}`}><strong>{loc.title}</strong><span>{loc.value}</span></div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {amenities.length > 0 && (
              <div id="amenities" className={styles.section}>
                <h2 className={styles.sectionTitle}>Amenities</h2>
                <div className={styles.amenities}>
                  {amenities.map((a) => (
                    <div key={a}>
                      <span className={styles.amenityIcon} aria-hidden="true">{getAmenityIcon(a)}</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {floorPlans.length > 0 && (
              <div id="floor-plans" className={styles.section}>
                <h2 className={styles.sectionTitle}>Floor Plans</h2>
                {floorPlansWithImages.length > 0 ? (
                  <FloorPlansLightbox plans={floorPlansWithImages} />
                ) : (
                  <div className={styles.floorPlans}>
                    {floorPlans.map((plan, i) => (
                      <div key={`${plan.label}-${i}`} className={styles.floorPlan}>
                        {plan.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className={styles.rightCol}>
            {price && (
              <div className={styles.priceCard}>
                <div className={styles.price}>{price}</div>
                <div className={styles.priceMeta}>
                  {priceMeta.map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}
                </div>
              </div>
            )}
            <div className={styles.reraCard}>Rera ID : {reraId}</div>
            <ProjectEnquireForm heading={enquireHeading} />
          </aside>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  )
}
