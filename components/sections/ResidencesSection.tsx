import type { IconicProjectCard } from '@/lib/types'
import ResidencesSectionClient from './ResidencesSectionClient'

interface Props { cards?: IconicProjectCard[] }

export default function ResidencesSection({ cards = [] }: Props) {
  return <ResidencesSectionClient cards={cards} />
}
