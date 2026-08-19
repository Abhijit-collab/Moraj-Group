import { notFound } from 'next/navigation'
import { getSanityClient, isSanityConfigured, urlFor } from '@/lib/sanity'
import { allProjectDetailSlugsQuery, projectDetailBySlugQuery, siteSettingsQuery } from '@/lib/queries'
import type { ProjectDetail, SiteSettings } from '@/lib/types'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import FloorPlansLightbox from './FloorPlansLightbox'
import ProjectEnquireForm from './ProjectEnquireForm'
import compareStyles from '../../compare/compare.module.css'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  if (!isSanityConfigured) return []
  const slugs = await getSanityClient().fetch<{ slug: string }[]>(allProjectDetailSlugsQuery)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSanityConfigured) {
    return { title: 'Project | Moraj Group' }
  }
  const project = await getSanityClient().fetch<ProjectDetail | null>(projectDetailBySlugQuery, { slug: params.slug })
  return {
    title: project?.projectName ? `${project.projectName} | Moraj Group` : 'Project | Moraj Group',
    description: project?.description,
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
  if (!isSanityConfigured) {
    return (
      <div style={{ padding: '120px 52px', fontFamily: 'var(--sans)', color: 'var(--mid)', maxWidth: '560px', lineHeight: 1.6 }}>
        Project pages load from Sanity. Add <code style={{ fontSize: '12px' }}>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to{' '}
        <code style={{ fontSize: '12px' }}>.env.local</code>, then restart the dev server.
      </div>
    )
  }

  const [settings, project] = await Promise.all([
    getSanityClient().fetch<SiteSettings>(siteSettingsQuery),
    getSanityClient().fetch<ProjectDetail | null>(projectDetailBySlugQuery, { slug: params.slug }),
  ])

  if (!project) notFound()

  const title = project.projectName
  const heroSubtitle = project.heroSubtitle ?? ''
  const heroAddress = project.heroAddress ?? ''
  const heroPrimaryCtaLabel = project.heroPrimaryCtaLabel ?? 'Book a Site Visit'
  const heroPrimaryCtaHref = project.heroPrimaryCtaHref ?? '#enquire'
  const heroSecondaryCtaLabel = project.heroSecondaryCtaLabel ?? 'Download Brochure'
  const heroSecondaryCtaHref = project.heroSecondaryCtaHref ?? '#'
  const heroBg = project.heroBackgroundUrl || project.heroBackgroundMediaUrl || ''
  const galleryHero = project.galleryHeroImageUrl || ''
  const galleryThumbs =
    project.galleryThumbs && project.galleryThumbs.length > 0
      ? project.galleryThumbs.slice(0, 2).map((img) => urlFor(img).width(600).height(260).fit('crop').url())
      : []
  const galleryMoreText = project.galleryMoreText ?? ''
  const specCards = project.specCards ?? []
  const description = project.description ?? ''
  const locationHighlights = project.locationHighlights ?? []
  const amenities = project.amenities ?? []
  const floorPlans = project.floorPlans ?? []
  const floorPlansWithImages = floorPlans
    .map((plan) => {
      const imageUrl = plan.imageUrl || (plan.image ? urlFor(plan.image).width(1200).fit('max').url() : '')
      return { label: plan.label ?? 'Floor Plan', imageUrl }
    })
    .filter((plan) => Boolean(plan.imageUrl))
  const price = project.price ?? ''
  const priceMeta = project.priceMeta ?? []
  const reraId = project.reraId ?? '—'
  const enquireHeading = project.enquireHeading ?? `Interested in ${title}?`
  const mapSrc = parseMapEmbedSrc(project.mapEmbedCode || project.mapEmbedUrl)

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
            <div
              className={styles.heroMedia}
              style={heroBg ? { backgroundImage: `url(${heroBg})` } : undefined}
            />
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
              {mapSrc && <a href="#location">Location</a>}
              {amenities.length > 0 && <a href="#amenities">Amenities</a>}
              {floorPlans.length > 0 && <a href="#floor-plans">Floor Plan</a>}
            </div>

            {galleryHero && (
              <>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Gallery</h2>
                </div>
                <div id="gallery" className={styles.galleryHero} style={{ backgroundImage: `url(${galleryHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                {galleryThumbs.length > 0 && (
                  <div className={styles.thumbRow}>
                    {galleryThumbs[0] && <div className={styles.thumb} style={{ backgroundImage: `url(${galleryThumbs[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
                    {galleryThumbs[1] && <div className={styles.thumb} style={{ backgroundImage: `url(${galleryThumbs[1]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
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

            {mapSrc && (
              <div id="location" className={styles.section}>
                <h2 className={styles.sectionTitle}>Location</h2>
                <iframe className={styles.mapBlock} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
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
