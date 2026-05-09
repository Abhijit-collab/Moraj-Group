import type { Metadata } from 'next'
import Footer from '@/components/sections/Footer'
import { blogPostsQuery, siteSettingsQuery } from '@/lib/queries'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import type { BlogPost, SiteSettings } from '@/lib/types'
import compareStyles from '../compare/compare.module.css'
import BlogCardsClient from './BlogCardsClient'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'News, updates and insights from Moraj Group.',
}

const FALLBACK_BLOGS: BlogPost[] = [
  {
    _id: 'fallback-1',
    title: 'How Moraj Builds Homes That Last for Generations',
    slug: { current: 'moraj-build-quality' },
    excerpt:
      'A look into our in-house construction process, quality checks and design standards that shape every Moraj residence. From structural planning and material benchmarks to finishing details and post-handover checks, each phase is documented and reviewed for consistency and long-term durability.',
    contentText:
      'A look into our in-house construction process, quality checks and design standards that shape every Moraj residence.\n\nFrom planning to handover, each milestone is tracked through structured engineering review and execution controls. Our teams evaluate civil quality, MEP coordination, facade detailing, waterproofing readiness and handover preparedness at pre-defined stages.\n\nDummy paragraph for testing modal readability: This sample text is intentionally longer so you can verify line clamping on cards, Read More visibility, scrolling inside the popup, and visual spacing across desktop and mobile breakpoints.\n\nDummy paragraph for testing: Buyers often ask what matters most before possession. We recommend checking natural light performance, storage planning, ventilation quality, amenity handover status and neighborhood connectivity at different times of day.',
    author: 'Moraj Group',
    publishedAt: '2026-01-10T08:00:00.000Z',
    coverImageExternalUrl:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'fallback-2',
    title: 'What to Evaluate Before Buying in Navi Mumbai',
    slug: { current: 'homebuyer-checklist-navi-mumbai' },
    excerpt:
      'A practical checklist for first-time buyers: location readiness, legal checks, construction quality and neighborhood growth. This includes transit plans, title documentation, delivery timelines, maintenance outlook and future infrastructure impact on everyday convenience.',
    contentText:
      'A practical checklist for first-time buyers: location readiness, legal checks, construction quality and neighborhood growth.\n\nUse this as a simple due-diligence framework before making your final booking decision. Start with paperwork confidence, then move to engineering quality, layout practicality and long-term livability.\n\nDummy paragraph for testing content expansion: During site visits, evaluate corridor width, lift waiting time assumptions, parking circulation, safety provisions and sunlight access in the exact unit stack you are considering.\n\nDummy paragraph for testing modal layout: This extended copy ensures the popup has enough vertical content to test scrolling behavior, close interaction, and typography legibility under real-world text lengths.',
    author: 'Moraj Group',
    publishedAt: '2026-02-14T08:00:00.000Z',
    coverImageExternalUrl:
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=80',
  },
]

export default async function BlogsPage() {
  const [settings, posts] = isSanityConfigured
    ? await Promise.all([
        getSanityClient().fetch<SiteSettings>(siteSettingsQuery),
        getSanityClient().fetch<BlogPost[]>(blogPostsQuery),
      ])
    : [devHomepageContent.settings, FALLBACK_BLOGS]

  const items = posts?.length ? posts : FALLBACK_BLOGS

  return (
    <div className={`${compareStyles.compareTheme} ${styles.page}`}>
      <section className={styles.hero}>
        <p className={styles.overline}>Moraj Journal</p>
        <h1 className={styles.title}>Blogs</h1>
        <p className={styles.subtitle}>
          Stories, updates and practical guidance from our team across design, construction and community living.
        </p>
      </section>

      <section className={styles.gridSection}>
        <BlogCardsClient posts={items} />
      </section>

      <Footer settings={settings} />
    </div>
  )
}
