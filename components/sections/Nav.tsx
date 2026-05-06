'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Nav.module.css'

interface Props {
  brandLogoSrc?: string
  brandLogoFallbackSrc?: string
  brandLogoAlt?: string
}

export default function Nav({
  brandLogoSrc,
  brandLogoFallbackSrc,
  brandLogoAlt = 'Moraj logo',
}: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logo}>
        {brandLogoSrc && (
          <img
            src={brandLogoSrc}
            alt={brandLogoAlt}
            className={styles.logoIcon}
            onError={(e) => {
              const img = e.currentTarget
              if (brandLogoFallbackSrc && img.dataset.fallbackTried !== '1') {
                img.dataset.fallbackTried = '1'
                img.src = brandLogoFallbackSrc
              } else {
                img.style.display = 'none'
              }
            }}
          />
        )}
        <span>Moraj</span>
      </Link>

      <div className={styles.links}>
        <Link href="/#residences" className={`${styles.link} ${styles.desktopLink}`}>Residences</Link>
        <Link href="/#craftsmanship" className={`${styles.link} ${styles.desktopLink}`}>About</Link>
        <Link href="/#team" className={`${styles.link} ${styles.desktopLink}`}>Legacy</Link>
        <Link href="/#enquire" className={styles.link}>Contact</Link>
        <Link href="/#enquire" className={styles.cta}>Enquire Now</Link>
      </div>
    </nav>
  )
}
