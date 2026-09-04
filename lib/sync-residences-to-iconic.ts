import { getSanityClient, isSanityConfigured } from '@/lib/sanity'

type ListingCard = {
  _key?: string
  title?: string
  location?: string
  status?: string
  completionYear?: number
  configuration?: string
  endDate?: string
  reraId?: string
  area?: string
  detailSlug?: string
  s3ImageUrl?: string
  image?: unknown
  _type?: string
}

const ICONIC_ID = 'iconicProjectsContent'
const RESIDENCES_ID = 'residencesListingContent'

function cardMatchKey(card: ListingCard): string {
  const slug = card.detailSlug?.trim().toLowerCase()
  if (slug) return `slug:${slug}`
  return `title:${(card.title ?? '').trim().toLowerCase()}`
}

function makeKey(): string {
  return `card${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`
}

function cloneCard(card: ListingCard): ListingCard & { _type: string } {
  const { _key: _ignored, ...rest } = card
  return {
    ...rest,
    _key: makeKey(),
    _type: 'iconicProjectCard',
  }
}

async function fetchDraftOrPublishedCards(
  client: ReturnType<typeof getSanityClient>,
  id: string
): Promise<{ cards: ListingCard[]; hasDraft: boolean; hasPublished: boolean }> {
  const draftId = `drafts.${id}`
  const [draftDoc, publishedDoc] = await Promise.all([
    client.fetch<{ cards?: ListingCard[] } | null>(`*[_id == $id][0]{ cards }`, { id: draftId }),
    client.fetch<{ cards?: ListingCard[] } | null>(`*[_id == $id][0]{ cards }`, { id }),
  ])
  return {
    cards: draftDoc?.cards ?? publishedDoc?.cards ?? [],
    hasDraft: Boolean(draftDoc),
    hasPublished: Boolean(publishedDoc),
  }
}

async function writeCardsToDraftAndPublished(
  client: ReturnType<typeof getSanityClient>,
  id: string,
  cards: ListingCard[],
  state: { hasDraft: boolean; hasPublished: boolean }
) {
  const draftId = `drafts.${id}`

  if (state.hasDraft) {
    await client.patch(draftId).set({ cards }).commit({ autoGenerateArrayKeys: true })
  } else {
    await client.createOrReplace({
      _id: draftId,
      _type: id,
      cards,
    })
  }

  if (state.hasPublished) {
    await client.patch(id).set({ cards }).commit({ autoGenerateArrayKeys: true })
  } else {
    await client.createOrReplace({
      _id: id,
      _type: id,
      cards,
    })
  }
}

/**
 * One-way sync: Residences Page Content → Iconic Projects Content.
 * Adds/updates matching cards. Never deletes Iconic cards.
 * Draft-aware so Studio deletes + re-sync stay consistent.
 */
export async function syncResidencesToIconic(): Promise<{
  ok: boolean
  added: number
  updated: number
  message?: string
}> {
  if (!isSanityConfigured) {
    return { ok: false, added: 0, updated: 0, message: 'Sanity is not configured' }
  }

  const client = getSanityClient()
  if (!process.env.SANITY_API_TOKEN) {
    return { ok: false, added: 0, updated: 0, message: 'SANITY_API_TOKEN is required to sync' }
  }

  const [residences, iconic] = await Promise.all([
    fetchDraftOrPublishedCards(client, RESIDENCES_ID),
    fetchDraftOrPublishedCards(client, ICONIC_ID),
  ])

  const sourceCards = residences.cards
  if (sourceCards.length === 0) {
    return { ok: true, added: 0, updated: 0, message: 'No Residences cards to sync' }
  }

  const iconicCards = [...iconic.cards]
  const indexByKey = new Map<string, number>()
  iconicCards.forEach((card, i) => indexByKey.set(cardMatchKey(card), i))

  let added = 0
  let updated = 0

  for (const source of sourceCards) {
    if (!source.title?.trim()) continue
    const key = cardMatchKey(source)
    const existingIndex = indexByKey.get(key)

    if (existingIndex === undefined) {
      iconicCards.push(cloneCard(source))
      indexByKey.set(key, iconicCards.length - 1)
      added += 1
      continue
    }

    const existing = iconicCards[existingIndex]
    iconicCards[existingIndex] = {
      ...existing,
      title: source.title,
      location: source.location,
      status: source.status,
      completionYear: source.completionYear,
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

  await writeCardsToDraftAndPublished(client, ICONIC_ID, iconicCards, iconic)

  return { ok: true, added, updated }
}
