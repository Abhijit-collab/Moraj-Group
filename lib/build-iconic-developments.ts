import type {
  HomepageDevelopmentCardRaw,
  Residence,
  ResidenceSummary,
  SiteSettings,
} from '@/lib/types'

function residenceToSummary(r: Residence): ResidenceSummary {
  return {
    _id: r._id,
    title: r.title,
    slug: r.slug,
    location: r.location,
    status: r.status,
    heroImage: r.heroImage,
    rera: r.rera,
  }
}

function mapHomepageCards(entries: HomepageDevelopmentCardRaw[] | undefined): ResidenceSummary[] {
  if (!entries?.length) return []
  const out: ResidenceSummary[] = []
  entries.forEach((e, i) => {
    if (
      e.cardType === 'residence' &&
      e.residence?._id &&
      e.residence.title &&
      e.residence.slug?.current
    ) {
      out.push({
        _id: e.residence._id,
        title: e.residence.title,
        slug: e.residence.slug,
        location: e.residence.location ?? '',
        status: e.residence.status ?? 'ongoing',
        heroImage: e.residence.heroImage,
        rera: e.residence.rera,
      })
      return
    }
    if (e.cardType === 'custom' && e.customTitle?.trim()) {
      const href = e.customHref?.trim() || '/residences'
      const slugTail = href.startsWith('http')
        ? `custom-${i}`
        : href.split('/').filter(Boolean).pop() || `custom-${i}`
      out.push({
        _id: `custom-home-${i}-${slugTail}`,
        title: e.customTitle.trim(),
        slug: { current: slugTail },
        location: e.customLocation?.trim() ?? '',
        status: e.customStatus ?? 'ongoing',
        heroImage: e.customImage ?? null,
        href,
      })
    }
  })
  return out
}

/**
 * Prefer explicit homepage cards from Site Settings; otherwise all residences; otherwise [] (client may use placeholders).
 */
export function buildIconicDevelopmentsList(
  homepageDevelopments: SiteSettings['homepageDevelopments'],
  allResidences: Residence[],
): ResidenceSummary[] {
  const fromSettings = mapHomepageCards(homepageDevelopments)
  if (fromSettings.length > 0) return fromSettings
  if (allResidences.length > 0) return allResidences.map(residenceToSummary)
  return []
}
