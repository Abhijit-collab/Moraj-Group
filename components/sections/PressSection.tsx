import styles from './PressSection.module.css'
import type { PressLogo } from '@/lib/types'

interface Props {
  press?: PressLogo[]
  logos?: string[]
}

const DEFAULT_LOGOS = ['Times of India', 'Hindustan Times', 'Maharashtra Times', 'DNA India', 'Lokmat']

export default function PressSection({ press, logos }: Props) {
  const useImages = press && press.length > 0 && press.every((p) => p.logoUrl)
  const textItems = logos?.length ? logos : DEFAULT_LOGOS

  if (useImages) {
    const items = press!
    const doubled = [...items, ...items]
    return (
      <div className={styles.press} data-reveal data-reveal-stagger="true">
        <span className={styles.label}>As Featured In</span>
        <div className={styles.sep} />
        <div className={styles.logosViewport}>
          <div className={`${styles.logosTrack} ${styles.logosTrackDesktop}`}>
            {items.map((p, i) => (
              <img
                key={p._key ?? `${p.logoUrl}-${i}`}
                src={p.logoUrl}
                alt={p.alt ?? ''}
                className={styles.logoImg}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <div className={`${styles.logosTrack} ${styles.logosTrackMobile}`}>
            {doubled.map((p, i) => (
              <img
                key={`${p._key ?? p.logoUrl}-m-${i}`}
                src={p.logoUrl}
                alt={p.alt ?? ''}
                className={styles.logoImg}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const items = textItems
  const doubled = [...items, ...items]

  return (
    <div className={styles.press} data-reveal data-reveal-stagger="true">
      <span className={styles.label}>As Featured In</span>
      <div className={styles.sep} />
      <div className={styles.logosViewport}>
        <div className={`${styles.logosTrack} ${styles.logosTrackDesktop}`}>
          {items.map((l, i) => (
            <span key={`${l}-${i}`} className={styles.logoText}>
              {l}
            </span>
          ))}
        </div>
        <div className={`${styles.logosTrack} ${styles.logosTrackMobile}`}>
          {doubled.map((l, i) => (
            <span key={`${l}-m-${i}`} className={styles.logoText}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
