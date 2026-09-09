'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import { creamBlurDataURL } from '@/lib/image-placeholder'

interface Props {
  images: string[]
  title: string
}

export default function GalleryLightbox({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const galleryHero = images[0]
  const remaining = images.slice(1)
  // Show every leftover thumb when there are ≤3; only use “+N more” when some stay hidden.
  const showMoreOverlay = remaining.length > 3
  const galleryThumbs = showMoreOverlay ? remaining.slice(0, 2) : remaining
  const hiddenCount = showMoreOverlay ? remaining.length - 2 : 0
  const galleryMoreText =
    hiddenCount > 0
      ? `+ ${hiddenCount} more photo${hiddenCount === 1 ? '' : 's'}`
      : null
  const galleryThumbCols = galleryThumbs.length + (galleryMoreText ? 1 : 0)
  const firstHiddenIndex = galleryThumbs.length + 1

  const activeImage = useMemo(() => {
    if (activeIndex === null) return null
    return images[activeIndex] ?? null
  }, [activeIndex, images])

  useEffect(() => {
    if (activeIndex === null) return
    if (activeIndex < 0 || activeIndex >= images.length) {
      setActiveIndex(images.length > 0 ? 0 : null)
    }
  }, [activeIndex, images.length])

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
        return
      }
      if (images.length < 2) return
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % images.length
        )
        return
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + images.length) % images.length
        )
      }
    }

    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [activeIndex, images.length])

  const openAt = (index: number) => {
    if (index < 0 || index >= images.length) return
    setActiveIndex(index)
  }

  const step = (delta: number) => {
    setActiveIndex((current) => {
      if (current === null || images.length < 1) return current
      return (current + delta + images.length) % images.length
    })
  }

  if (!galleryHero) return null

  return (
    <>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Gallery</h2>
      </div>
      <button
        type="button"
        id="gallery"
        className={styles.galleryHero}
        onClick={() => openAt(0)}
        aria-label={`Open ${title} gallery image 1`}
      >
        <Image
          src={galleryHero}
          alt={`${title} gallery`}
          fill
          placeholder="blur"
          blurDataURL={creamBlurDataURL}
          sizes="(max-width: 900px) 100vw, 720px"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </button>
      {galleryThumbs.length > 0 && (
        <div
          className={styles.thumbRow}
          style={{ gridTemplateColumns: `repeat(${galleryThumbCols}, minmax(0, 1fr))` }}
        >
          {galleryThumbs.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              className={styles.thumb}
              onClick={() => openAt(i + 1)}
              aria-label={`Open ${title} gallery image ${i + 2}`}
            >
              <Image
                src={src}
                alt={`${title} gallery thumbnail ${i + 1}`}
                fill
                placeholder="blur"
                blurDataURL={creamBlurDataURL}
                sizes="240px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </button>
          ))}
          {galleryMoreText ? (
            <button
              type="button"
              className={styles.thumbMore}
              onClick={() => openAt(firstHiddenIndex)}
              aria-label={`View all ${images.length} gallery photos`}
            >
              {galleryMoreText}
            </button>
          ) : null}
        </div>
      )}

      {activeImage && activeIndex !== null && (
        <div
          className={styles.floorPlanModalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
          onClick={() => setActiveIndex(null)}
        >
          <div className={styles.galleryModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.galleryModalStage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.galleryModalImage}
                src={activeImage}
                alt={`${title} gallery image ${activeIndex + 1}`}
              />
              <button
                type="button"
                className={styles.galleryModalClose}
                onClick={() => setActiveIndex(null)}
                aria-label="Close gallery"
              >
                ×
              </button>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.galleryNavBtn} ${styles.galleryNavPrev}`}
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className={`${styles.galleryNavBtn} ${styles.galleryNavNext}`}
                    onClick={() => step(1)}
                    aria-label="Next photo"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            <div className={styles.floorPlanModalLabel}>
              {activeIndex + 1} / {images.length}
            </div>
            {images.length > 1 && (
              <div className={styles.galleryFilmstrip} role="tablist" aria-label="Gallery thumbnails">
                {images.map((src, i) => (
                  <button
                    key={`${src}-strip-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={i === activeIndex}
                    className={
                      i === activeIndex
                        ? `${styles.galleryFilmstripItem} ${styles.galleryFilmstripItemActive}`
                        : styles.galleryFilmstripItem
                    }
                    onClick={() => openAt(i)}
                    aria-label={`Go to photo ${i + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
