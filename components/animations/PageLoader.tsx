'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface Props {
  logoSrc?: string
  logoFallbackSrc?: string
  logoAlt?: string
}

type LoaderPhase = 'visible' | 'hiding' | 'unmounted'

export default function PageLoader({ logoSrc, logoFallbackSrc, logoAlt = 'Moraj logo' }: Props) {
  const [phase, setPhase] = useState<LoaderPhase>('visible')
  const pathname = usePathname()
  const isCompare = pathname === '/'

  useEffect(() => {
    const t = window.setTimeout(() => setPhase('hiding'), 1500)
    return () => window.clearTimeout(t)
  }, [])

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
      className={`pageLoader ${isCompare ? 'pageLoaderCompare' : ''} ${hiding ? 'pageLoaderHidden' : ''}`}
      aria-hidden={hiding}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="pageLoaderInner">
        {logoSrc && (
          <img
            src={logoSrc}
            alt={logoAlt}
            className="pageLoaderLogo"
            onError={(e) => {
              const img = e.currentTarget
              if (logoFallbackSrc && img.dataset.fallbackTried !== '1') {
                img.dataset.fallbackTried = '1'
                img.src = logoFallbackSrc
              } else {
                img.style.display = 'none'
              }
            }}
          />
        )}
      </div>
    </div>
  )
}
