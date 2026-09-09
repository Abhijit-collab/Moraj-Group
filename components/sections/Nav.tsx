'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  const [logoSrc, setLogoSrc] = useState(brandLogoSrc)
  const [logoHidden, setLogoHidden] = useState(false)

  useEffect(() => {
    setLogoSrc(brandLogoSrc)
    setLogoHidden(false)
  }, [brandLogoSrc])

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
    <nav className={`${styles.nav} ${styles.compareNav} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logo}>
        {logoSrc && !logoHidden && (
          <Image
            src={logoSrc}
            alt={brandLogoAlt}
            width={320}
            height={178}
            className={styles.logoIcon}
            priority
            quality={100}
            sizes="(max-width: 768px) 80px, 120px"
            onError={() => {
              if (brandLogoFallbackSrc && logoSrc !== brandLogoFallbackSrc) {
                setLogoSrc(brandLogoFallbackSrc)
              } else {
                setLogoHidden(true)
              }
            }}
          />
        )}
      </Link>

      <div className={styles.links}>
        <Link href="/" className={`${styles.link} ${styles.desktopLink}`}>Home</Link>
        <Link href="/residences" className={`${styles.link} ${styles.desktopLink}`}>Residences</Link>
        <Link href="/blogs" className={`${styles.link} ${styles.desktopLink}`}>Blogs</Link>
        <Link href="/#craftsmanship" className={`${styles.link} ${styles.desktopLink}`}>About</Link>
        <Link href="/career" className={`${styles.link} ${styles.desktopLink}`}>Career</Link>
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
          <Link href="/residences" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Residences</Link>
          <Link href="/blogs" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Blogs</Link>
          <Link href="/#craftsmanship" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/career" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Career</Link>
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
