import type { SiteSettings } from '@/lib/types'
import styles from './IntroSection.module.css'

interface Props { settings: SiteSettings | null }

export default function IntroSection({ settings }: Props) {
  return (
    <section className={styles.intro} data-reveal data-reveal-stagger="true">
      <div className={styles.left}>
        <div className={styles.label}>
          <div className={styles.labelRule} />
          {settings?.introPhilosophy ?? 'Our Philosophy'}
        </div>
        <h2 className={styles.h2}>
          We don&apos;t just build homes.<br />
          We create places worth<br />
          <em>returning to.</em>
        </h2>
      </div>
      <div className={styles.right}>
        <p className={styles.p}>
          {settings?.introParagraph1 ?? 'Since 1985, Moraj Group has shaped the residential landscape of Navi Mumbai. As a fully integrated developer — architecture, engineering, interiors — we have never compromised on quality or delivery.'}
        </p>
        <p className={styles.p}>
          {settings?.introParagraph2 ?? 'Every residence we build reflects international construction standards, thoughtful spatial design, and a relentless commitment to the families who call our homes their own.'}
        </p>
        <a href="#craftsmanship" className={styles.link}>Discover our story &nbsp;→</a>
      </div>
    </section>
  )
}
