export type PropertyStatus = 'upcoming' | 'ongoing' | 'completed'

export function formatPropertyStatus(status?: string): string {
  switch (status) {
    case 'upcoming':
      return 'Upcoming'
    case 'ongoing':
      return 'Ongoing'
    case 'completed':
      return 'Completed'
    default:
      return 'Upcoming'
  }
}
