'use client'

import { useEffect, useState } from 'react'

interface Props {
  logoSrc?: string
  logoFallbackSrc?: string
  logoAlt?: string
}

export default function PageLoader({ logoSrc, logoFallbackSrc, logoAlt = 'Moraj logo' }: Props) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setHidden(true), 1500)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className={`pageLoader ${hidden ? 'pageLoaderHidden' : ''}`} aria-hidden={hidden}>
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
        <div className="pageLoaderWord">Moraj</div>
      </div>
    </div>
  )
}
