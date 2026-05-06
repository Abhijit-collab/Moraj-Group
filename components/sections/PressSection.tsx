import styles from './PressSection.module.css'

interface Props { logos?: string[] }

const DEFAULT_LOGOS = ['Times of India', 'Hindustan Times', 'Maharashtra Times', 'DNA India', 'Lokmat']

export default function PressSection({ logos }: Props) {
  const items = logos?.length ? logos : DEFAULT_LOGOS

  return (
    <div className={styles.press} data-reveal data-reveal-stagger="true">
      <span className={styles.label}>As Featured In</span>
      <div className={styles.sep} />
      <div className={styles.logos}>
        {items.map((l, i) => <span key={i} className={styles.logo}>{l}</span>)}
      </div>
    </div>
  )
}
