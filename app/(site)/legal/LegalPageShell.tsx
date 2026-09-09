import type { ReactNode } from 'react'
import Footer from '@/components/sections/Footer'
import type { SiteSettings } from '@/lib/types'
import compareStyles from '../compare/compare.module.css'
import styles from './legal.module.css'

interface Props {
  overline: string
  title: string
  updated: string
  settings: SiteSettings | null
  children: ReactNode
}

export default function LegalPageShell({ overline, title, updated, settings, children }: Props) {
  return (
    <div className={`${compareStyles.compareTheme} ${styles.page}`}>
      <header className={styles.hero}>
        <p className={styles.overline}>{overline}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Last updated: {updated}</p>
      </header>
      <article className={styles.content}>{children}</article>
      <Footer settings={settings} />
    </div>
  )
}
