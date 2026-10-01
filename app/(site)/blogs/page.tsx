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

export default async function BlogsPage() {
  const [settings, posts] = isSanityConfigured
    ? await Promise.all([
        getSanityClient().fetch<SiteSettings>(siteSettingsQuery),
        getSanityClient().fetch<BlogPost[]>(blogPostsQuery),
      ])
    : [devHomepageContent.settings, []]

  const items = posts ?? []

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
        {items.length ? (
          <BlogCardsClient posts={items} />
        ) : (
          <p className={styles.empty}>No blogs published yet. Please check back soon.</p>
        )}
      </section>

      <Footer settings={settings} />
    </div>
  )
}
