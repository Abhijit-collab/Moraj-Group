'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { BlogPost } from '@/lib/types'
import styles from './page.module.css'

interface Props {
  posts: BlogPost[]
}

function formatDate(value?: string): string {
  if (!value) return 'Recently published'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Recently published'
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean)
}

export default function BlogCardsClient({ posts }: Props) {
  const excerptRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const [overflowMap, setOverflowMap] = useState<Record<string, boolean>>({})
  const [activePost, setActivePost] = useState<BlogPost | null>(null)

  useEffect(() => {
    const checkOverflow = () => {
      const next: Record<string, boolean> = {}
      posts.forEach((post, index) => {
        const el = excerptRefs.current[index]
        if (!el) return
        next[post._id] = el.scrollHeight > el.clientHeight + 1
      })
      setOverflowMap(next)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [posts])

  useEffect(() => {
    document.body.style.overflow = activePost ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activePost])

  const modalParagraphs = useMemo(() => {
    if (!activePost) return []
    const longText = activePost.contentText?.trim() || activePost.excerpt?.trim() || ''
    return splitParagraphs(longText)
  }, [activePost])

  return (
    <>
      <div className={styles.grid}>
        {posts.map((post, index) => {
          const imageSrc = post.coverImageExternalUrl?.trim() || post.coverImageUrl?.trim()
          const previewText = post.contentText?.trim() || post.excerpt?.trim() || ''
          const showReadMore = Boolean(overflowMap[post._id])
          return (
            <article key={post._id} className={styles.card}>
              <div className={styles.media}>
                {imageSrc ? (
                  <img src={imageSrc} alt={post.title} className={styles.image} loading="lazy" decoding="async" />
                ) : (
                  <div className={styles.imagePlaceholder} />
                )}
              </div>
              <div className={styles.body}>
                <p className={styles.meta}>
                  <span>{post.author || 'Moraj Group'}</span>
                  <span>•</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </p>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p
                  ref={(el) => {
                    excerptRefs.current[index] = el
                  }}
                  className={`${styles.excerpt} ${styles.excerptClamp}`}
                >
                  {previewText}
                </p>
                {showReadMore && (
                  <button type="button" className={styles.readMore} onClick={() => setActivePost(post)}>
                    Read More
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {activePost && (
        <div className={styles.modalOverlay} role="presentation" onClick={() => setActivePost(null)}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={activePost.title}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalScroller}>
              <button type="button" className={styles.modalClose} onClick={() => setActivePost(null)} aria-label="Close">
                ×
              </button>
              <div className={styles.modalMedia}>
                {(activePost.coverImageExternalUrl?.trim() || activePost.coverImageUrl?.trim()) ? (
                  <img
                    src={activePost.coverImageExternalUrl?.trim() || activePost.coverImageUrl?.trim()}
                    alt={activePost.title}
                    className={styles.modalImage}
                  />
                ) : (
                  <div className={styles.imagePlaceholder} />
                )}
              </div>
              <div className={styles.modalBody}>
                <p className={styles.meta}>
                  <span>{activePost.author || 'Moraj Group'}</span>
                  <span>•</span>
                  <span>{formatDate(activePost.publishedAt)}</span>
                </p>
                <h3 className={styles.modalTitle}>{activePost.title}</h3>
                <div className={styles.modalContent}>
                  {modalParagraphs.map((paragraph, i) => (
                    <p key={`${activePost._id}-p-${i}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
