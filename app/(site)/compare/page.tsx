import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import {
  heroQuery,
  residencesQuery,
  teamQuery,
  testimonialsQuery,
  iconicProjectsContentQuery,
  siteSettingsQuery,
} from '@/lib/queries'
import type { Hero, Residence, TeamMember, Testimonial, SiteSettings, IconicProjectsContent } from '@/lib/types'

import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import IntroSection from '@/components/sections/IntroSection'
import CompareResidencesSection from '@/components/compare/CompareResidencesSection'
import CraftsmanshipSection from '@/components/sections/CraftsmanshipSection'
import TeamSection from '@/components/sections/TeamSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PressSection from '@/components/sections/PressSection'
import EnquireSection from '@/components/sections/EnquireSection'
import Footer from '@/components/sections/Footer'
import styles from './compare.module.css'

// Compare page (separate route) - tweak here safely.
export const revalidate = 60

export default async function CompareHomePage() {
  const { hero, residences, team, testimonials, settings, iconicProjectsContent } = isSanityConfigured
    ? await (async () => {
        const c = getSanityClient()
        const [hero, residences, team, testimonials, settings, iconicProjectsContent] = await Promise.all([
          c.fetch<Hero>(heroQuery),
          c.fetch<Residence[]>(residencesQuery),
          c.fetch<TeamMember[]>(teamQuery),
          c.fetch<Testimonial[]>(testimonialsQuery),
          c.fetch<SiteSettings>(siteSettingsQuery),
          c.fetch<IconicProjectsContent | null>(iconicProjectsContentQuery),
        ])
        return { hero, residences, team, testimonials, settings, iconicProjectsContent }
      })()
    : { ...devHomepageContent, iconicProjectsContent: null as IconicProjectsContent | null }

  const iconicDevelopments = iconicProjectsContent?.cards ?? settings?.iconicProjects ?? []
  const compareHero = hero
    ? { ...hero, heading: 'MORAJ GROUP', headingItalic: 'A Legacy of Trust and Excellence Since 1985' }
    : { heading: 'MORAJ GROUP', headingItalic: 'A Legacy of Trust and Excellence Since 1985' }

  return (
    <div className={styles.compareTheme}>
      <HeroSection hero={compareHero} />
      <StatsBar stats={settings?.stats} />
      <IntroSection settings={settings} />
      <CompareResidencesSection cards={iconicDevelopments} />
      <CraftsmanshipSection settings={settings} />
      <div className={styles.foundersCardsSection}>
        <div className={styles.foundersPlaceholder}>
          <div className={styles.founderCardSlot}>
            <div className={styles.founderCardBody}>
              <div className={styles.founderCardTitle}>In-house design</div>
              <p className={styles.founderCardDesc}>Architecture and execution under one roof</p>
            </div>
          </div>
          <div className={styles.founderCardSlot}>
            <div className={styles.founderCardBody}>
              <div className={styles.founderCardTitle}>On-time delivery</div>
              <p className={styles.founderCardDesc}>30+ projects handed over as promised</p>
            </div>
          </div>
          <div className={styles.founderCardSlot}>
            <div className={styles.founderCardBody}>
              <div className={styles.founderCardTitle}>International standards</div>
              <p className={styles.founderCardDesc}>Global construction benchmarks applied</p>
            </div>
          </div>
          <div className={styles.founderCardSlot}>
            <div className={styles.founderCardBody}>
              <div className={styles.founderCardTitle}>Lifestyle-first</div>
              <p className={styles.founderCardDesc}>Spaces designed for how families truly live</p>
            </div>
          </div>
        </div>
        <div className={styles.foundersDivider} role="presentation" />
      </div>
      <div className={styles.foundersHead}>
        <div className={styles.foundersLabel}>Our Founders</div>
      </div>
      <TeamSection team={team} settings={settings} mobileLayout="stack" />
      <TestimonialsSection testimonials={testimonials} />
      <PressSection logos={settings?.pressLogos} />
      <EnquireSection settings={settings} residences={residences} />
      <Footer settings={settings} />
    </div>
  )
}

