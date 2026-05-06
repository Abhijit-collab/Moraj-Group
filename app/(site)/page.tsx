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
import ResidencesSection from '@/components/sections/ResidencesSection'
import CraftsmanshipSection from '@/components/sections/CraftsmanshipSection'
import TeamSection from '@/components/sections/TeamSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PressSection from '@/components/sections/PressSection'
import EnquireSection from '@/components/sections/EnquireSection'
import Footer from '@/components/sections/Footer'

// Revalidate page every 60 seconds (ISR)
export const revalidate = 60

export default async function HomePage() {
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

  return (
    <>
      <HeroSection hero={hero} />
      <StatsBar stats={settings?.stats} />
      <IntroSection settings={settings} />
      <ResidencesSection cards={iconicDevelopments} />
      <CraftsmanshipSection settings={settings} />
      <TeamSection team={team} settings={settings} />
      <TestimonialsSection testimonials={testimonials} />
      <PressSection logos={settings?.pressLogos} />
      <EnquireSection settings={settings} residences={residences} />
      <Footer settings={settings} />
    </>
  )
}
