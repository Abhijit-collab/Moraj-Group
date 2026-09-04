import type { IconicProjectCard } from '@/lib/types'

export type ProjectStatusTab = 'upcoming' | 'ongoing' | 'completed'

const STATUS_ORDER: Record<ProjectStatusTab, number> = {
  upcoming: 0,
  ongoing: 1,
  completed: 2,
}

/** Valid completion year, or null when missing/invalid. */
export function parseCompletionYear(card: Pick<IconicProjectCard, 'completionYear'>): number | null {
  const year = Number(card.completionYear)
  if (!Number.isFinite(year) || year < 1900) return null
  return year
}

/** Within a list: newest year first; cards with no year always last. */
export function sortByCompletionYearDesc(cards: IconicProjectCard[]): IconicProjectCard[] {
  return [...cards].sort((a, b) => {
    const yearA = parseCompletionYear(a)
    const yearB = parseCompletionYear(b)

    if (yearA === null && yearB === null) {
      return (a.title || '').localeCompare(b.title || '')
    }
    if (yearA === null) return 1
    if (yearB === null) return -1

    const yearDiff = yearB - yearA
    if (yearDiff !== 0) return yearDiff
    return (a.title || '').localeCompare(b.title || '')
  })
}

/**
 * All filter order: Upcoming → Ongoing → Completed.
 * Within each status, most recent completion year first; no year last.
 */
export function sortForAllFilter(cards: IconicProjectCard[]): IconicProjectCard[] {
  return [...cards].sort((a, b) => {
    const statusA = (a.status === 'ongoing' || a.status === 'completed' ? a.status : 'upcoming') as ProjectStatusTab
    const statusB = (b.status === 'ongoing' || b.status === 'completed' ? b.status : 'upcoming') as ProjectStatusTab
    const statusDiff = STATUS_ORDER[statusA] - STATUS_ORDER[statusB]
    if (statusDiff !== 0) return statusDiff

    const yearA = parseCompletionYear(a)
    const yearB = parseCompletionYear(b)

    if (yearA === null && yearB === null) {
      return (a.title || '').localeCompare(b.title || '')
    }
    if (yearA === null) return 1
    if (yearB === null) return -1

    const yearDiff = yearB - yearA
    if (yearDiff !== 0) return yearDiff
    return (a.title || '').localeCompare(b.title || '')
  })
}
