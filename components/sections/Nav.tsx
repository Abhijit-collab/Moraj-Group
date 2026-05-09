'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

interface Props {
  brandLogoSrc?: string
  brandLogoFallbackSrc?: string
  brandLogoAlt?: string
  phone?: string
}

export default function Nav({
  brandLogoSrc,
  brandLogoFallbackSrc,
  brandLogoAlt = 'Moraj logo',
  phone = '+91 98205 77144',
}: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isCompare = pathname === '/' || pathname?.startsWith('/moraj-opulence') || pathname?.startsWith('/blogs')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${isCompare ? styles.compareNav : ''}`}>
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
      </Link>

      <div className={styles.links}>
        <Link href="/" className={`${styles.link} ${styles.desktopLink}`}>Home</Link>
        <Link href="/#residences" className={`${styles.link} ${styles.desktopLink}`}>Residences</Link>
        <Link href="/blogs" className={`${styles.link} ${styles.desktopLink}`}>Blogs</Link>
        <Link href="/#craftsmanship" className={`${styles.link} ${styles.desktopLink}`}>About</Link>
        <Link href="/#team" className={`${styles.link} ${styles.desktopLink}`}>Career</Link>
        <Link href="/#enquire" className={styles.link}>Contact</Link>
      </div>

      <button
        type="button"
        className={`${styles.mobileMenuBtn} ${menuOpen ? styles.mobileMenuBtnOpen : ''}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`${styles.mobileMenuPanel} ${menuOpen ? styles.mobileMenuPanelOpen : ''}`}>
        <div className={styles.mobileMenuList}>
          <Link href="/" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/#residences" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Residences</Link>
          <Link href="/blogs" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Blogs</Link>
          <Link href="/#craftsmanship" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/#team" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Career</Link>
          <Link href="/#enquire" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
        <div className={styles.mobileMenuActions}>
          <Link href="/#enquire" className={styles.mobileActionPrimary} onClick={() => setMenuOpen(false)}>
            <span aria-hidden="true">✦</span>&nbsp;Enquire Now
          </Link>
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className={styles.mobileActionSecondary} onClick={() => setMenuOpen(false)}>
            <span aria-hidden="true">☎</span>&nbsp;Call
          </a>
        </div>
      </div>
    </nav>
  )
}
