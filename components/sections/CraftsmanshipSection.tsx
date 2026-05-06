import type { SiteSettings } from '@/lib/types'
import styles from './CraftsmanshipSection.module.css'

interface Props { settings: SiteSettings | null }

const DEFAULT_VALUES = [
  { title: 'In-house design', body: 'Architecture and execution under one roof' },
  { title: 'On-time delivery', body: '30+ projects handed over as promised' },
  { title: 'International standards', body: 'Global construction benchmarks applied' },
  { title: 'Lifestyle-first', body: 'Spaces designed for how families truly live' },
]

export default function CraftsmanshipSection({ settings }: Props) {
  const values = (settings as any)?.craftValues ?? DEFAULT_VALUES
  const p1 = (settings as any)?.craftParagraph1 ?? 'Unlike most developers, Moraj Group controls every stage of construction under one roof. From architecture and structural engineering to interior design and finishing — no contractor handles what we can do better ourselves.'
  const p2 = (settings as any)?.craftParagraph2 ?? 'This integrated approach has been our foundation for over four decades, and it is why every Moraj residence delivers exactly what was promised — on time, without exception.'
  const mediaLabel =
    settings?.craftMediaLabel?.trim() || 'Now Launching in Panvel–Sanpada'
  const craftVideoUrl = settings?.craftVideoUrl?.trim()

  return (
    <section className={styles.section} id="craftsmanship" data-reveal data-craft>
      <div className={styles.imgSide}>
        {craftVideoUrl ? (
          <video
            className={styles.mediaVideo}
            src={craftVideoUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div className={styles.imgPlaceholder} />
        )}
        <div className={styles.mediaLabelWrap}>
          <span className={styles.imgLabel}>{mediaLabel}</span>
        </div>
      </div>
      <div className={styles.textSide}>
        <div className={styles.label}>
          <div className={styles.labelRule} />
          Our Craftsmanship
        </div>
        <h2 className={styles.h2}>
          Built in-house.<br />
          Finished with <em>pride.</em>
        </h2>
        <p className={styles.p}>{p1}</p>
        <p className={styles.p}>{p2}</p>
        <a href="#team" className={styles.link}>Learn about our process &nbsp;→</a>
        <div className={styles.grid}>
          {values.map((v: { title: string; body: string }, i: number) => (
            <div key={i} className={styles.val} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className={styles.valTitle}>{v.title}</div>
              <div className={styles.valBody}>{v.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
