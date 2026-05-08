import { getSanityClient, isSanityConfigured, urlFor } from '@/lib/sanity'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import { projectDetailBySlugQuery, siteSettingsQuery } from '@/lib/queries'
import type { ProjectDetail, SiteSettings } from '@/lib/types'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import compareStyles from '../compare/compare.module.css'
import styles from './page.module.css'

export const revalidate = 60

function parseMapEmbedSrc(raw?: string): string {
  if (!raw) return ''
  const trimmed = raw.trim()
  if (!trimmed) return ''
  const iframeSrcMatch = trimmed.match(/src\s*=\s*["']([^"']+)["']/i)
  if (iframeSrcMatch?.[1]) return iframeSrcMatch[1]
  return trimmed
}

export default async function MorajOpulencePage() {
  const [settings, project] = isSanityConfigured
    ? await Promise.all([
        getSanityClient().fetch<SiteSettings>(siteSettingsQuery),
        getSanityClient().fetch<ProjectDetail | null>(projectDetailBySlugQuery, { slug: 'moraj-opulence' }),
      ])
    : [devHomepageContent.settings, null]

  const title = project?.projectName ?? 'Moraj Opulence'
  const heroSubtitle = project?.heroSubtitle ?? '3 & 4 BHK Residences'
  const heroAddress = project?.heroAddress ?? 'Panvel, Navi Mumbai'
  const heroPrimaryCtaLabel = project?.heroPrimaryCtaLabel ?? 'Book a Site Visit'
  const heroPrimaryCtaHref = project?.heroPrimaryCtaHref ?? '#enquire'
  const heroSecondaryCtaLabel = project?.heroSecondaryCtaLabel ?? 'Download Brochure'
  const heroSecondaryCtaHref = project?.heroSecondaryCtaHref ?? '#'
  const heroBg = project?.heroBackgroundUrl || project?.heroBackgroundMediaUrl || ''
  const galleryHero =
    project?.galleryHeroImageUrl ||
    'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&fit=crop&w=1200&q=80'
  const galleryThumbs =
    project?.galleryThumbs && project.galleryThumbs.length > 0
      ? project.galleryThumbs.slice(0, 2).map((img) => urlFor(img).width(600).height(260).fit('crop').url())
      : [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        ]
  const galleryMoreText = project?.galleryMoreText ?? '+ 16 more photos'
  const specCards = project?.specCards?.length
    ? project.specCards
    : [
        { value: '3 & 4 BHK', label: 'Configuration' },
        { value: '980 - 1540', label: 'sq.ft.' },
        { value: 'Jun 2031', label: 'Possession' },
        { value: '28', label: 'Floors' },
        { value: '240', label: 'Units' },
        { value: 'Ready', label: 'to enquire' },
      ]
  const description =
    project?.description ??
    'Moraj Opulence redefines luxury living in Panvel with thoughtfully designed 3 and 4 BHK residences. Crafted with premium finishes and international standards, each home is envisioned for spacious, elegant and connected family life.'
  const locationHighlights = project?.locationHighlights?.length
    ? project.locationHighlights
    : [
        { title: 'Panvel Station', value: '1.2 km' },
        { title: 'NMIA', value: '9 km' },
        { title: 'Mumbai-Pune Expy', value: '2.5 km' },
      ]
  const amenities = project?.amenities?.length
    ? project.amenities
    : ['Swimming Pool', 'Gymnasium', 'Clubhouse', 'Children Play Area', 'Jogging Track', 'Indoor Games', 'Yoga Deck', 'Multipurpose Hall']
  const floorPlans = project?.floorPlans?.length
    ? project.floorPlans
    : [{ label: 'Type A | 980 sq.ft.' }, { label: 'Type B | 1540 sq.ft.' }]
  const price = project?.price ?? '₹ 1.85 Cr'
  const priceMeta = project?.priceMeta?.length ? project.priceMeta : ['3 & 4 BHK', '980 - 1540 sq.ft.', 'Jun 2031', 'New Launch']
  const reraId = project?.reraId ?? '—'
  const enquireHeading = project?.enquireHeading ?? `Interested in ${title}?`
  const mapSrc = parseMapEmbedSrc(project?.mapEmbedCode || project?.mapEmbedUrl)

  return (
    <div className={compareStyles.compareTheme}>
      <main className={styles.page}>
        <section
          className={styles.hero}
          style={
            heroBg
              ? {
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.68) 0%, rgba(0,0,0,.42) 100%), url(${heroBg})`,
                  backgroundSize: 'cover, cover',
                  backgroundPosition: 'center, center 58%',
                  backgroundRepeat: 'no-repeat, no-repeat',
                  backgroundColor: '#0e0e0f',
                }
              : undefined
          }
        >
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>{title}</h1>
            <div className={styles.heroSubtitle}>{heroSubtitle}</div>
            <div className={styles.heroAddress}>{heroAddress}</div>
            <div className={styles.heroRera}>Rera ID : {reraId}</div>
            <div className={styles.heroActions}>
              <Link href={heroPrimaryCtaHref} className={styles.heroBtnPrimary}>{heroPrimaryCtaLabel}</Link>
              <Link href={heroSecondaryCtaHref} className={styles.heroBtnSecondary}>{heroSecondaryCtaLabel}</Link>
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
            <div className={styles.sectionNav}>
              <a href="#gallery">Gallery</a>
              <a href="#description">Description</a>
              <a href="#location">Location</a>
              <a href="#amenities">Amenities</a>
              <a href="#floor-plans">Floor Plan</a>
            </div>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Gallery</h2>
            </div>

            <div id="gallery" className={styles.galleryHero} style={{ backgroundImage: `url(${galleryHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className={styles.thumbRow}>
              <div className={styles.thumb} style={{ backgroundImage: `url(${galleryThumbs[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className={styles.thumb} style={{ backgroundImage: `url(${galleryThumbs[1]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className={styles.thumbMore}>{galleryMoreText}</div>
            </div>

            <div className={styles.specGrid}>
              {specCards.map((spec, i) => (
                <div key={`${spec.value}-${i}`} className={styles.specCard}>
                  <span>{spec.value}</span>
                  <small>{spec.label}</small>
                </div>
              ))}
            </div>

            <div id="description" className={styles.section}>
              <h2 className={styles.sectionTitle}>Description</h2>
              <p>{description}</p>
            </div>

            <div id="location" className={styles.section}>
              <h2 className={styles.sectionTitle}>Location</h2>
              {mapSrc ? (
                <iframe className={styles.mapBlock} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <div className={styles.mapBlock} />
              )}
              <div className={styles.locStats}>
                {locationHighlights.map((loc, i) => (
                  <div key={`${loc.title}-${i}`}><strong>{loc.title}</strong><span>{loc.value}</span></div>
                ))}
              </div>
            </div>

            <div id="amenities" className={styles.section}>
              <h2 className={styles.sectionTitle}>Amenities</h2>
              <div className={styles.amenities}>
                {amenities.map((a) => (
                  <div key={a}>{a}</div>
                ))}
              </div>
            </div>

            <div id="floor-plans" className={styles.section}>
              <h2 className={styles.sectionTitle}>Floor Plans</h2>
              <div className={styles.floorPlans}>
                {floorPlans.map((plan, i) => {
                  const imgSrc = plan.imageUrl || (plan.image ? urlFor(plan.image).width(900).height(520).fit('crop').url() : '')
                  return (
                    <div
                      key={`${plan.label}-${i}`}
                      className={styles.floorPlan}
                      style={imgSrc ? { backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                    >
                      {plan.label}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <aside className={styles.rightCol}>
            <div className={styles.priceCard}>
              <div className={styles.price}>{price}</div>
              <div className={styles.priceMeta}>
                {priceMeta.map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}
              </div>
            </div>

            <div className={styles.reraCard}>Rera ID : {reraId}</div>

            <form className={styles.enquireCard} id="enquire">
              <h3>{enquireHeading}</h3>
              <input placeholder="Full Name" />
              <input placeholder="Email Address" />
              <input placeholder="Phone Number" />
              <button type="button">Request Callback</button>
            </form>
          </aside>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  )
}
