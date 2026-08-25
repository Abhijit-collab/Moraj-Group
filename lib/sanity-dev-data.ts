import type { Hero, IconicProjectCard, TeamMember, Testimonial, SiteSettings } from '@/lib/types'

/** Used when `next dev` runs without `NEXT_PUBLIC_SANITY_PROJECT_ID`; sections fall back to built-in copy. */
export const devHomepageContent = {
  hero: null as Hero | null,
  projects: [] as IconicProjectCard[],
  team: [] as TeamMember[],
  testimonials: [] as Testimonial[],
  settings: null as SiteSettings | null,
}
