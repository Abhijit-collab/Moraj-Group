import { getSanityClient, isSanityConfigured, urlFor } from '@/lib/sanity'
import { residencesQuery } from '@/lib/queries'
import type { Residence } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'All Residences',
  description: 'Explore all Moraj Group residences across Navi Mumbai — Panvel, Kharghar, Ulwe and Sanpada.',
}

const STATUS_LABELS: Record<string, string> = {
  'new-launch': 'New Launch',
  'ongoing': 'Ongoing',
  'completed': 'Completed',
}

export default async function ResidencesPage() {
  const residences = !isSanityConfigured
    ? []
    : await getSanityClient().fetch<Residence[]>(residencesQuery)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.overline}>Our Presence</span>
        <h1 className={styles.h1}>All Residences</h1>
      </div>

      <div className={styles.grid}>
        {residences.map((r) => (
          <Link key={r._id} href={`/residences/${r.slug.current}`} className={styles.tile}>
            <div className={styles.imgWrap}>
              {r.heroImage ? (
                <Image
                  src={urlFor(r.heroImage).width(600).height(800).fit('crop').url()}
                  alt={r.heroImage.alt ?? r.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: 'cover', transition: 'transform .7s cubic-bezier(.22,1,.36,1)' }}
                  className={styles.img}
                />
              ) : (
                <div className={styles.placeholder} />
              )}
              <span className={styles.badge}>{STATUS_LABELS[r.status] ?? r.status}</span>
            </div>
            <div className={styles.caption}>
              <span className={styles.name}>{r.title}</span>
              <span className={styles.sep}>|</span>
              <span className={styles.loc}>{r.location}</span>
            </div>
            {r.configuration && <div className={styles.config}>{r.configuration} · {r.area}</div>}
          </Link>
        ))}
      </div>
    </div>
  )
}
