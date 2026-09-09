'use client'

import { useEffect, useRef } from 'react'
import type { Hero } from '@/lib/types'
import { HERO_VIDEO_READY_EVENT } from '@/lib/hero-loader-events'
import styles from './HeroSection.module.css'

interface Props { hero: Hero | null }

function videoType(src: string) {
  return src.endsWith('.webm') ? 'video/webm' : 'video/mp4'
}

function signalHeroVideoReady() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(HERO_VIDEO_READY_EVENT))
}

export default function HeroSection({ hero }: Props) {
  const desktopRef = useRef<HTMLVideoElement | null>(null)
  const mobileRef = useRef<HTMLVideoElement | null>(null)
  const readySent = useRef(false)

  const italic = hero?.headingItalic?.trim() || ''
  const subheading = hero?.subheading?.trim() || "Navi Mumbai's Trusted Developer · Est. 1985"
  const desktopVideoSrc = hero?.heroVideoUrl?.trim() || hero?.videoHref?.trim() || ''
  const mobileOnlySrc = hero?.heroMobileVideoUrl?.trim() || hero?.mobileVideoHref?.trim() || ''
  const hasDesktopVideo = Boolean(desktopVideoSrc)
  const hasMobileVideo = Boolean(mobileOnlySrc)
  const hasAnyVideo = hasDesktopVideo || hasMobileVideo

  useEffect(() => {
    if (!hasAnyVideo) {
      signalHeroVideoReady()
      return
    }

    readySent.current = false

    const markReady = () => {
      if (readySent.current) return
      readySent.current = true
      signalHeroVideoReady()
    }

    const pickActiveVideo = () => {
      const preferMobile = window.matchMedia('(max-width: 768px)').matches
      if (preferMobile && mobileRef.current) return mobileRef.current
      if (desktopRef.current) return desktopRef.current
      return mobileRef.current
    }

    const video = pickActiveVideo()
    if (!video) {
      markReady()
      return
    }

    const onReady = () => {
      void video.play().catch(() => undefined)
      markReady()
    }

    if (video.readyState >= 3) {
      onReady()
      return
    }

    video.addEventListener('canplaythrough', onReady)
    video.addEventListener('loadeddata', onReady)
    video.addEventListener('error', markReady)
    // Kick buffering
    video.load()

    return () => {
      video.removeEventListener('canplaythrough', onReady)
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('error', markReady)
    }
  }, [hasAnyVideo, desktopVideoSrc, mobileOnlySrc])

  return (
    <section className={styles.hero} data-reveal>
      {hasDesktopVideo && (
        <video
          ref={desktopRef}
          className={`${styles.videoBg} ${hasMobileVideo ? styles.videoDesktop : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.svg"
        >
          <source src={desktopVideoSrc} type={videoType(desktopVideoSrc)} />
        </video>
      )}
      {hasMobileVideo && (
        <video
          ref={mobileRef}
          className={`${styles.videoBg} ${hasDesktopVideo ? styles.videoMobile : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.svg"
        >
          <source src={mobileOnlySrc} type={videoType(mobileOnlySrc)} />
        </video>
      )}

      {!hasAnyVideo && <div className={styles.heroBgFallback} />}
      <div className={styles.dim} />

      <div className={styles.bottomCopy}>
        {(subheading || italic) && (
          <div className={styles.bottomText}>
            {subheading ? <p className={styles.bottomOverline}>{subheading}</p> : null}
            {italic ? <p className={styles.bottomHeadline}>{italic}</p> : null}
          </div>
        )}
        <div className={styles.scroll}>
          <span className={styles.scrollTxt}>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  )
}
