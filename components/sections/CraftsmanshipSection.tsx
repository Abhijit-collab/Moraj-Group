import type { SiteSettings } from '@/lib/types'
import styles from './CraftsmanshipSection.module.css'

interface Props { settings: SiteSettings | null }

export default function CraftsmanshipSection({ settings }: Props) {
  const p1 = (settings as any)?.craftParagraph1 ?? 'Unlike most developers, Moraj Group controls every stage of construction under one roof. From architecture and structural engineering to interior design and finishing — no contractor handles what we can do better ourselves.'
  const p2 = (settings as any)?.craftParagraph2 ?? 'This integrated approach has been our foundation for over four decades, and it is why every Moraj residence delivers exactly what was promised — on time, without exception.'
  const mediaLabel =
    settings?.craftMediaLabel?.trim() || 'Now Launching in Panvel–Sanpada'
  const craftVideoUrl = settings?.craftVideoUrl?.trim() || settings?.craftVideoFileUrl?.trim()

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
            preload="metadata"
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
        <a href="#founders-cards" className={styles.link}>Learn about our process &nbsp;→</a>
      </div>
    </section>
  )
}
