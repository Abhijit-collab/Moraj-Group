import type { Metadata } from 'next'
import Footer from '@/components/sections/Footer'
import { careerContentQuery, siteSettingsQuery } from '@/lib/queries'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import type { CareerContent, SiteSettings } from '@/lib/types'
import compareStyles from '../compare/compare.module.css'
import CareerForm from './CareerForm'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Career',
  description: 'Explore career opportunities and work culture at Moraj Group.',
}

export default async function CareerPage() {
  const [settings, careerContent] = isSanityConfigured
    ? await Promise.all([
        getSanityClient().fetch<SiteSettings>(siteSettingsQuery),
        getSanityClient().fetch<CareerContent | null>(careerContentQuery),
      ])
    : [devHomepageContent.settings, null]
  const heroImage = careerContent?.heroImageExternalUrl?.trim() || careerContent?.heroImageUrl?.trim()

  return (
    <div className={`${compareStyles.compareTheme} ${styles.page}`}>
      <section
        className={`${styles.hero} ${heroImage ? styles.heroWithImage : ''}`}
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      >
        <p className={styles.overline}>Careers at Moraj</p>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.card} data-reveal>
          <h1 className={styles.title}>Our Work Culture</h1>
          <p>
            At Moraj, every member is part of a big family driven towards common goals - to get faster, to get smarter
            and to realize the best version of themselves. If you fancy a supportive community along with a progressive
            environment, do send us your resume and we&apos;ll be all ears.
          </p>
        </div>

        <CareerForm />
      </section>

      <Footer settings={settings} />
    </div>
  )
}
