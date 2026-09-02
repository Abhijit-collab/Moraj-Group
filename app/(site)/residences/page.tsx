import Footer from '@/components/sections/Footer'
import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import { residencesListingContentQuery, siteSettingsQuery } from '@/lib/queries'
import type { ResidencesListingContent, SiteSettings } from '@/lib/types'
import type { Metadata } from 'next'
import compareStyles from '../compare/compare.module.css'
import ResidencesListingClient from './ResidencesListingClient'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Residences',
  description: 'Explore Moraj Group residences across Navi Mumbai — Panvel, Kharghar, Ulwe and Sanpada.',
}

export default async function ResidencesPage() {
  const [residencesListingContent, settings] = isSanityConfigured
    ? await Promise.all([
        getSanityClient().fetch<ResidencesListingContent | null>(residencesListingContentQuery),
        getSanityClient().fetch<SiteSettings>(siteSettingsQuery),
      ])
    : [null, devHomepageContent.settings]
  const cards = residencesListingContent?.cards ?? []

  return (
    <div className={`${compareStyles.compareTheme} ${styles.page}`}>
      <div className={styles.header}>
        <span className={styles.overline}>Our Presence</span>
      </div>

      <ResidencesListingClient cards={cards} />

      <Footer settings={settings} />
    </div>
  )
}
