import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.skOverline} />
        <div className={styles.skTitle} />
      </div>
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.tile}>
            <div className={styles.skImg} />
            <div className={styles.skCaption} />
          </div>
        ))}
      </div>
    </div>
  )
}
