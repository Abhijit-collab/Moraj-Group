export type ListingCard = {
  _key?: string
  title?: string
  location?: string
  status?: string
  propertyType?: string
  configuration?: string
  endDate?: string
  reraId?: string
  area?: string
  detailSlug?: string
  s3ImageUrl?: string
  image?: unknown
  _type?: string
}

export type ListingDocId = 'iconicProjectsContent' | 'residencesListingContent'

export function cardMatchKey(card: ListingCard): string {
  const slug = card.detailSlug?.trim().toLowerCase()
  if (slug) return `slug:${slug}`
  return `title:${(card.title ?? '').trim().toLowerCase()}`
}

export function makeKey(): string {
  return `card${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`
}

type ClientLike = {
  fetch: <T>(query: string, params?: Record<string, unknown>) => Promise<T>
  patch: (id: string) => {
    set: (attrs: Record<string, unknown>) => {
      commit: (opts?: { autoGenerateArrayKeys?: boolean }) => Promise<unknown>
    }
  }
  createOrReplace: (doc: Record<string, unknown>) => Promise<unknown>
}

function mergeSourceIntoTarget(targetCards: ListingCard[], sourceCards: ListingCard[]) {
  const next = [...targetCards]
  const indexByKey = new Map<string, number>()
  next.forEach((card, i) => indexByKey.set(cardMatchKey(card), i))

  let added = 0
  let updated = 0

  for (const source of sourceCards) {
    if (!source.title?.trim()) continue
    const key = cardMatchKey(source)
    const existingIndex = indexByKey.get(key)

    if (existingIndex === undefined) {
      const { _key: _ignored, ...rest } = source
      next.push({
        ...rest,
        _key: makeKey(),
        _type: 'iconicProjectCard',
      })
      indexByKey.set(key, next.length - 1)
      added += 1
      continue
    }

    const existing = next[existingIndex]
    next[existingIndex] = {
      ...existing,
      title: source.title,
      location: source.location,
      status: source.status,
      propertyType: source.propertyType,
      configuration: source.configuration,
      endDate: source.endDate,
      reraId: source.reraId,
      area: source.area,
      detailSlug: source.detailSlug,
      s3ImageUrl: source.s3ImageUrl,
      image: source.image ?? existing.image,
      _key: existing._key || makeKey(),
    }
    updated += 1
  }

  return { cards: next, added, updated }
}

/**
 * Merge cards into a listing document.
 * Uses draft cards as the base when a draft exists (what Studio shows after deletes),
 * then writes the result to BOTH draft and published so Studio and the site stay in sync.
 */
export async function mergeCardsIntoTarget(
  client: ClientLike,
  targetId: ListingDocId,
  sourceCards: ListingCard[]
): Promise<{ added: number; updated: number }> {
  const draftId = `drafts.${targetId}`

  const [draftDoc, publishedDoc] = await Promise.all([
    client.fetch<{ cards?: ListingCard[] } | null>(`*[_id == $id][0]{ cards }`, { id: draftId }),
    client.fetch<{ cards?: ListingCard[] } | null>(`*[_id == $id][0]{ cards }`, { id: targetId }),
  ])

  // Draft is what Studio displays — critical after delete-without-publish
  const baseCards = draftDoc?.cards ?? publishedDoc?.cards ?? []
  const { cards, added, updated } = mergeSourceIntoTarget(baseCards, sourceCards)

  // Update draft so Studio shows the card immediately
  if (draftDoc) {
    await client.patch(draftId).set({ cards }).commit({ autoGenerateArrayKeys: true })
  } else {
    await client.createOrReplace({
      _id: draftId,
      _type: targetId,
      cards,
    })
  }

  // Update published so the website reflects the same list
  if (publishedDoc) {
    await client.patch(targetId).set({ cards }).commit({ autoGenerateArrayKeys: true })
  } else {
    await client.createOrReplace({
      _id: targetId,
      _type: targetId,
      cards,
    })
  }

  return { added, updated }
}

export async function copyOneCardToResidences(client: ClientLike, source: ListingCard) {
  if (!source.title?.trim()) {
    throw new Error('Project Name is required before copying')
  }
  const result = await mergeCardsIntoTarget(client, 'residencesListingContent', [source])
  return result.added > 0 ? 'added' : 'updated'
}
