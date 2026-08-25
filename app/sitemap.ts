import { MetadataRoute } from 'next'
import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import { allProjectDetailSlugsQuery } from '@/lib/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://morajgroup.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = !isSanityConfigured
    ? []
    : await getSanityClient().fetch<{ slug: string }[]>(allProjectDetailSlugsQuery)

  const projectUrls = (projectSlugs ?? [])
    .filter((p) => p?.slug)
    .map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/residences`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...projectUrls,
  ]
}
