import type { Testimonial } from '@/lib/types'
import styles from './TestimonialsSection.module.css'

interface Props { testimonials: Testimonial[] }

export default function TestimonialsSection({ testimonials }: Props) {
  const fallbackItems: Testimonial[] = [
    {
      _id: 'fallback-testimonial-1',
      quote:
        'From possession timelines to final handover quality, Moraj delivered exactly what they promised.',
      name: 'A. Mehta',
      residence: 'Moraj Riverside',
      location: 'Navi Mumbai',
      rating: 5,
    },
    {
      _id: 'fallback-testimonial-2',
      quote:
        'The planning, ventilation, and finishing quality made us feel confident from day one.',
      name: 'P. Kulkarni',
      residence: 'Moraj Palm Paradise',
      location: 'Panvel',
      rating: 5,
    },
    {
      _id: 'fallback-testimonial-3',
      quote:
        'Professional team, transparent communication, and a home that truly feels thoughtfully designed.',
      name: 'R. Shah',
      residence: 'Moraj Signature',
      location: 'Kharghar',
      rating: 5,
    },
  ]
  const baseItems = testimonials.length > 0 ? testimonials : fallbackItems
  const items = [...baseItems, ...baseItems]

  return (
    <section className={styles.section} data-reveal data-reveal-stagger="true">
      <div className={styles.label}>
        <div className={styles.labelRule} />
        Resident Voices
      </div>
      <h2 className={styles.h2}>
        Homes that speak<br />for <em>themselves</em>
      </h2>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {items.map((t, i) => (
            <div key={`${t._id}-${i}`} className={styles.card}>
              <span className={styles.qm}>&ldquo;</span>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.name}>{t.name}</div>
              <div className={styles.loc}>{t.residence}{t.location ? `, ${t.location}` : ''}</div>
              <div className={styles.stars}>{'★'.repeat(t.rating ?? 5)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
