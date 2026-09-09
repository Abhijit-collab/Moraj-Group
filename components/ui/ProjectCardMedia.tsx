'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './ProjectCardMedia.module.css'

interface Props {
  src?: string | null
  brandLogoSrc?: string
  alt: string
  priority?: boolean
  sizes: string
  imageClassName?: string
}

export default function ProjectCardMedia({
  src,
  brandLogoSrc,
  alt,
  priority = false,
  sizes,
  imageClassName,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setFailed(false)
  }, [src])

  const showPhoto = Boolean(src) && !failed
  const showLogo = Boolean(brandLogoSrc) && (!showPhoto || !loaded)

  return (
    <>
      {showLogo ? (
        <div className={styles.logoFallback} aria-hidden={showPhoto && loaded}>
          <Image
            src={brandLogoSrc!}
            alt=""
            width={220}
            height={120}
            className={styles.logoFallbackImg}
            sizes="220px"
            priority={priority && !showPhoto}
          />
        </div>
      ) : null}

      {!showPhoto && !brandLogoSrc ? <div className={styles.placeholder} /> : null}

      {showPhoto ? (
        <Image
          src={src!}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`${imageClassName ?? ''} ${styles.photo} ${loaded ? styles.photoLoaded : ''}`.trim()}
          style={{ objectFit: 'cover' }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : null}
    </>
  )
}
