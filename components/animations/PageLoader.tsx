'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { HERO_VIDEO_READY_EVENT } from '@/lib/hero-loader-events'

interface Props {
  logoSrc?: string
  logoFallbackSrc?: string
  logoAlt?: string
}

type LoaderPhase = 'visible' | 'hiding' | 'unmounted'

const MIN_HOME_LOADER_MS = 700
const MAX_HOME_LOADER_MS = 15000
const OTHER_PAGE_LOADER_MS = 900

export default function PageLoader({ logoSrc, logoFallbackSrc, logoAlt = 'Moraj logo' }: Props) {
  const [phase, setPhase] = useState<LoaderPhase>('visible')
  const [src, setSrc] = useState(logoSrc)
  const [hidden, setHidden] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const startedAt = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now())
  const dismissed = useRef(false)

  useEffect(() => {
    setSrc(logoSrc)
    setHidden(false)
  }, [logoSrc])

  const beginHide = useCallback(() => {
    if (dismissed.current) return
    dismissed.current = true
    setPhase('hiding')
  }, [])

  useEffect(() => {
    dismissed.current = false
    startedAt.current = performance.now()
    setPhase('visible')

    if (!isHome) {
      const t = window.setTimeout(beginHide, OTHER_PAGE_LOADER_MS)
      return () => window.clearTimeout(t)
    }

    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      const elapsed = performance.now() - startedAt.current
      const wait = Math.max(0, MIN_HOME_LOADER_MS - elapsed)
      window.setTimeout(beginHide, wait)
    }

    const onReady = () => finish()
    window.addEventListener(HERO_VIDEO_READY_EVENT, onReady)

    // Safety: never block forever if AWS stream stalls
    const maxTimer = window.setTimeout(finish, MAX_HOME_LOADER_MS)

    return () => {
      window.removeEventListener(HERO_VIDEO_READY_EVENT, onReady)
      window.clearTimeout(maxTimer)
    }
  }, [beginHide, isHome, pathname])

  useEffect(() => {
    if (phase !== 'hiding') return
    const id = window.setTimeout(() => setPhase('unmounted'), 1200)
    return () => window.clearTimeout(id)
  }, [phase])

  const onTransitionEnd = useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName !== 'opacity') return
    setPhase((p) => (p === 'hiding' ? 'unmounted' : p))
  }, [])

  if (phase === 'unmounted') return null

  const hiding = phase === 'hiding'

  return (
    <div
      className={`pageLoader ${isHome ? 'pageLoaderCompare' : ''} ${hiding ? 'pageLoaderHidden' : ''}`}
      aria-hidden={hiding}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="pageLoaderInner">
        {src && !hidden && (
          <Image
            src={src}
            alt={logoAlt}
            width={152}
            height={152}
            className="pageLoaderLogo"
            priority
            sizes="(max-width: 768px) 92px, 152px"
            onError={() => {
              if (logoFallbackSrc && src !== logoFallbackSrc) {
                setSrc(logoFallbackSrc)
              } else {
                setHidden(true)
              }
            }}
          />
        )}
      </div>
    </div>
  )
}
