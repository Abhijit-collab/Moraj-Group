import type { Hero } from '@/lib/types'
import Link from 'next/link'
import styles from './HeroSection.module.css'

interface Props { hero: Hero | null }

function videoType(src: string) {
  return src.endsWith('.webm') ? 'video/webm' : 'video/mp4'
}

export default function HeroSection({ hero }: Props) {
  const heading = hero?.heading ?? 'Where every home tells a story of'
  const italic = hero?.headingItalic ?? 'enduring craft.'
  const headingWords = heading.split(' ')
  const italicWords = italic.split(' ')
  const subheading = hero?.subheading ?? "Navi Mumbai's Trusted Developer · Est. 1985"
  const ctaLabel = hero?.ctaLabel ?? 'Explore Residences'
  // Always go to the all-properties listing (ignore CMS hash links like /#residences)
  const ctaHref = '/residences'
  const desktopVideoSrc = hero?.heroVideoUrl?.trim() || hero?.videoHref?.trim() || ''
  const mobileOnlySrc = hero?.heroMobileVideoUrl?.trim() || hero?.mobileVideoHref?.trim() || ''
  const hasDesktopVideo = Boolean(desktopVideoSrc)
  const hasMobileVideo = Boolean(mobileOnlySrc)
  const hasAnyVideo = hasDesktopVideo || hasMobileVideo

  return (
    <section className={styles.hero} data-reveal>
      {hasDesktopVideo && (
        <video
          className={`${styles.videoBg} ${hasMobileVideo ? styles.videoDesktop : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.svg"
        >
          <source src={desktopVideoSrc} type={videoType(desktopVideoSrc)} />
        </video>
      )}
      {hasMobileVideo && (
        <video
          className={`${styles.videoBg} ${hasDesktopVideo ? styles.videoMobile : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.svg"
        >
          <source src={mobileOnlySrc} type={videoType(mobileOnlySrc)} />
        </video>
      )}

      {/* Fallback: cinematic gradient when no video */}
      {!hasAnyVideo && <div className={styles.heroBgFallback} />}
      <div className={styles.dim} />

      {/* Hero text — centred */}
      <div className={styles.body}>
        <span className={styles.overline}>
          <span className={styles.afterHeadline}>{subheading}</span>
        </span>
        <h1 className={styles.h1}>
          <span className={styles.hLine}>
            {headingWords.map((word, i) => (
              <span key={`${word}-${i}`} className={styles.hWord} style={{ animationDelay: `${i * 0.08}s` }}>
                {word}&nbsp;
              </span>
            ))}
          </span>
          <br />
          <em className={styles.hLine}>
            {italicWords.map((word, i) => (
              <span
                key={`${word}-italic-${i}`}
                className={styles.hWord}
                style={{ animationDelay: `${(headingWords.length + i) * 0.08}s` }}
              >
                {word}&nbsp;
              </span>
            ))}
          </em>
        </h1>
        <Link href={ctaHref} className={`${styles.cta} ${styles.afterHeadline}`}>{ctaLabel}</Link>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scroll}>
        <span className={styles.scrollTxt}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
