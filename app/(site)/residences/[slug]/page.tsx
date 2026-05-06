import { getSanityClient, isSanityConfigured, urlFor } from '@/lib/sanity'
import { residenceBySlugQuery, residencesQuery } from '@/lib/queries'
import type { Residence } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const revalidate = 60

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  if (!isSanityConfigured) return []
  const residences = await getSanityClient().fetch<Residence[]>(residencesQuery)
  return residences.map((r) => ({ slug: r.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSanityConfigured) {
    return { title: 'Residences | Moraj Group', description: 'Explore Moraj Group residences across Navi Mumbai.' }
  }
  const residence = await getSanityClient().fetch<Residence>(residenceBySlugQuery, { slug: params.slug })
  return {
    title: `${residence?.title} | ${residence?.location}`,
    description: residence?.description,
  }
}

export default async function ResidencePage({ params }: Props) {
  if (!isSanityConfigured) {
    return (
      <div style={{ padding: '120px 52px', fontFamily: 'var(--sans)', color: 'var(--mid)', maxWidth: '560px', lineHeight: 1.6 }}>
        Residence pages load from Sanity. Add <code style={{ fontSize: '12px' }}>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and your dataset) to{' '}
        <code style={{ fontSize: '12px' }}>.env.local</code>, then restart the dev server.
      </div>
    )
  }

  const residence = await getSanityClient().fetch<Residence>(residenceBySlugQuery, { slug: params.slug })

  if (!residence) return <div style={{ padding: '120px 52px', fontFamily: 'var(--sans)', color: 'var(--mid)' }}>Residence not found.</div>

  const statusLabel = residence.status === 'new-launch' ? 'New Launch' : residence.status === 'ongoing' ? 'Ongoing' : 'Completed'

  return (
    <article className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        {residence.heroImage ? (
          <Image
            src={urlFor(residence.heroImage).width(1440).height(640).fit('crop').url()}
            alt={residence.heroImage.alt ?? residence.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.heroPlaceholder} />
        )}
        <div className={styles.heroDim} />
        <div className={styles.heroContent}>
          <span className={styles.status}>{statusLabel}</span>
          <h1 className={styles.title}>{residence.title}</h1>
          <p className={styles.location}>{residence.location}</p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className={styles.overview}>
        <div className={styles.specs}>
          {residence.configuration && (
            <div className={styles.spec}><span className={styles.specLabel}>Configuration</span><span className={styles.specValue}>{residence.configuration}</span></div>
          )}
          {residence.area && (
            <div className={styles.spec}><span className={styles.specLabel}>Area</span><span className={styles.specValue}>{residence.area}</span></div>
          )}
          {residence.pricing && (
            <div className={styles.spec}><span className={styles.specLabel}>Pricing</span><span className={styles.specValue}>{residence.pricing}</span></div>
          )}
          {residence.rera && (
            <div className={styles.spec}><span className={styles.specLabel}>RERA</span><span className={styles.specValue}>{residence.rera}</span></div>
          )}
        </div>
        {residence.description && (
          <div className={styles.desc}><p>{residence.description}</p></div>
        )}
      </section>

      {/* GALLERY */}
      {residence.gallery && residence.gallery.length > 0 && (
        <section className={styles.gallery}>
          <div className={styles.sectionLabel}>Gallery</div>
          <div className={styles.galleryGrid}>
            {residence.gallery.map((img, i) => (
              <div key={i} className={styles.galleryItem}>
                <Image
                  src={urlFor(img).width(800).height(600).fit('crop').url()}
                  alt={img.alt ?? `${residence.title} — image ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AMENITIES */}
      {residence.amenities && residence.amenities.length > 0 && (
        <section className={styles.amenities}>
          <div className={styles.sectionLabel}>Amenities</div>
          <ul className={styles.amenityList}>
            {residence.amenities.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </section>
      )}

      {/* FLOOR PLANS */}
      {residence.floorplans && residence.floorplans.length > 0 && (
        <section className={styles.floorplans}>
          <div className={styles.sectionLabel}>Floor Plans</div>
          <div className={styles.floorplanGrid}>
            {residence.floorplans.map((fp, i) => (
              <div key={i} className={styles.floorplanItem}>
                <Image
                  src={urlFor(fp).width(600).url()}
                  alt={fp.alt ?? `Floor plan ${i + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
                {fp.alt && <p className={styles.floorplanLabel}>{fp.alt}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BACK */}
      <div className={styles.back}>
        <Link href="/#residences" className={styles.backLink}>← Back to all residences</Link>
      </div>

    </article>
  )
}
