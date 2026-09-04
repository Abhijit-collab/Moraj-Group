import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import {
  heroQuery,
  teamQuery,
  testimonialsQuery,
  iconicProjectsContentQuery,
  residencesListingContentQuery,
  pressContentQuery,
  siteSettingsQuery,
} from '@/lib/queries'
import type {
  Hero,
  TeamMember,
  Testimonial,
  SiteSettings,
  IconicProjectsContent,
  ResidencesListingContent,
  PressContent,
  IconicProjectCard,
} from '@/lib/types'

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
import styles from './compare/compare.module.css'

export const revalidate = 60

export default async function HomePage() {
  const { hero, team, testimonials, settings, iconicProjectsContent, residencesListingContent, pressContent } =
    isSanityConfigured
      ? await (async () => {
          const c = getSanityClient()
          const [hero, team, testimonials, settings, iconicProjectsContent, residencesListingContent, pressContent] =
            await Promise.all([
              c.fetch<Hero>(heroQuery),
              c.fetch<TeamMember[]>(teamQuery),
              c.fetch<Testimonial[]>(testimonialsQuery),
              c.fetch<SiteSettings>(siteSettingsQuery),
              c.fetch<IconicProjectsContent | null>(iconicProjectsContentQuery),
              c.fetch<ResidencesListingContent | null>(residencesListingContentQuery),
              c.fetch<PressContent | null>(pressContentQuery),
            ])
          return {
            hero,
            team,
            testimonials,
            settings,
            iconicProjectsContent,
            residencesListingContent,
            pressContent,
          }
        })()
      : {
          ...devHomepageContent,
          iconicProjectsContent: null as IconicProjectsContent | null,
          residencesListingContent: null as ResidencesListingContent | null,
          pressContent: null as PressContent | null,
        }

  const iconicDevelopments = iconicProjectsContent?.cards ?? settings?.iconicProjects ?? []
  const enquireOptions: IconicProjectCard[] =
    residencesListingContent?.cards ?? iconicDevelopments
  const fallbackSubheading = devHomepageContent.hero?.subheading ?? "Navi Mumbai's Trusted Developer · Est. 1985"
  const fallbackCtaLabel = devHomepageContent.hero?.ctaLabel ?? 'Explore Residences'
  const compareHero: Hero = {
    heading: hero?.heading ?? 'MORAJ GROUP',
    headingItalic: hero?.headingItalic ?? 'A Legacy of Trust and Excellence Since 1985',
    subheading: hero?.subheading ?? fallbackSubheading,
    ctaLabel: hero?.ctaLabel ?? fallbackCtaLabel,
    ctaHref: '/residences',
    videoHref: hero?.videoHref,
    heroVideoUrl: hero?.heroVideoUrl,
    mobileVideoHref: hero?.mobileVideoHref,
    heroMobileVideoUrl: hero?.heroMobileVideoUrl,
    stats: hero?.stats,
  }

  return (
    <div className={styles.compareTheme}>
      <HeroSection hero={compareHero} />
      <StatsBar stats={compareHero.stats} />
      <CompareResidencesSection cards={iconicDevelopments} />
      <CraftsmanshipSection settings={settings} />
      <div className={styles.foundersCardsSection} id="founders-cards">
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
      <IntroSection settings={settings} />
      <TestimonialsSection testimonials={testimonials} />
      <PressSection press={pressContent?.logos} logos={pressContent?.fallbackPublicationNames} />
      <EnquireSection settings={settings} projects={enquireOptions} />
      <Footer settings={settings} />
    </div>
  )
}
