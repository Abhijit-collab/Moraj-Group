import styles from './SectionLabel.module.css'

interface Props {
  children: React.ReactNode
  color?: string
}

export default function SectionLabel({ children }: Props) {
  return (
    <div className={styles.label}>
      <div className={styles.rule} />
      {children}
    </div>
  )
}
