'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface Props {
  logoSrc?: string
  logoFallbackSrc?: string
  logoAlt?: string
}

type LoaderPhase = 'visible' | 'hiding' | 'unmounted'

export default function PageLoader({ logoSrc, logoFallbackSrc, logoAlt = 'Moraj logo' }: Props) {
  const [phase, setPhase] = useState<LoaderPhase>('visible')
  const [src, setSrc] = useState(logoSrc)
  const [hidden, setHidden] = useState(false)
  const pathname = usePathname()
  const isCompare = pathname === '/'

  useEffect(() => {
    setSrc(logoSrc)
    setHidden(false)
  }, [logoSrc])

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
