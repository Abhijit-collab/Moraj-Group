import Image from 'next/image'
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
              <Image
                key={p._key ?? `${p.logoUrl}-${i}`}
                src={p.logoUrl!}
                alt={p.alt?.trim() || 'Press feature logo'}
                width={200}
                height={52}
                className={styles.logoImg}
                sizes="(max-width: 768px) 170px, 200px"
              />
            ))}
          </div>
          <div className={`${styles.logosTrack} ${styles.logosTrackMobile}`}>
            {doubled.map((p, i) => (
              <Image
                key={`${p._key ?? p.logoUrl}-m-${i}`}
                src={p.logoUrl!}
                alt={p.alt?.trim() || 'Press feature logo'}
                width={200}
                height={52}
                className={styles.logoImg}
                sizes="170px"
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
