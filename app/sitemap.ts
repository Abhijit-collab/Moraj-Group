import { MetadataRoute } from 'next'
import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import { residencesQuery } from '@/lib/queries'
import type { Residence } from '@/lib/types'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://morajgroup.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const residences = !isSanityConfigured
    ? []
    : await getSanityClient().fetch<Residence[]>(residencesQuery)

  const residenceUrls = residences.map((r) => ({
    url: `${BASE_URL}/residences/${r.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/residences`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...residenceUrls,
  ]
}
