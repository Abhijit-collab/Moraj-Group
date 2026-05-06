'use client'

import { useEffect, useMemo, useState } from 'react'
import type { TeamMember, SiteSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import styles from './TeamSection.module.css'

interface Props { team: TeamMember[]; settings: SiteSettings | null }

export default function TeamSection({ team, settings }: Props) {
  const quote = (settings as any)?.legacyQuote ?? '"Honesty and quality are not features — they are the foundation on which every Moraj home stands. That belief has not changed in forty years."'

  const hasTeam = team && team.length > 0
  const fallbackTeam: TeamMember[] = [
    {
      _id: 'fallback-mohan',
      name: 'Mohan Gurnani',
      bio: '',
      photo: null,
    },
    {
      _id: 'fallback-priyaa',
      name: 'Priyaa Gurnani',
      bio: '',
      photo: null,
    },
    {
      _id: 'fallback-vansh',
      name: 'Vansh Gurnani',
      bio: '',
      photo: null,
    },
  ]

  const cards = hasTeam ? team : fallbackTeam
  const [isMobile, setIsMobile] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const [expandedBios, setExpandedBios] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const apply = () => setIsMobile(window.innerWidth <= 768)
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  const visibleCards = useMemo(() => {
    if (!isMobile) return cards
    if (cards.length <= 2) return cards
    return [cards[startIndex % cards.length], cards[(startIndex + 1) % cards.length]]
  }, [cards, isMobile, startIndex])

  const canMove = cards.length > 2
  const move = (direction: 'left' | 'right') => {
    if (!canMove) return
    setStartIndex((prev) =>
      direction === 'right'
        ? (prev + 1) % cards.length
        : (prev - 1 + cards.length) % cards.length
    )
  }

  useEffect(() => {
    if (!isMobile || !canMove) return
    const id = window.setInterval(() => {
      setStartIndex((prev) => (prev + 1) % cards.length)
    }, 3600)
    return () => window.clearInterval(id)
  }, [isMobile, canMove, cards.length])

  const toggleBio = (id: string) => {
    setExpandedBios((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className={styles.section} id="team" data-reveal data-reveal-stagger="true">
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.label}>
            <div className={styles.labelRule} />
            The Gurnani Family
          </div>
          <h2 className={styles.h2}>
            A vision carried<br />across <em>generations.</em>
          </h2>
        </div>
        <blockquote className={styles.quote}>{quote}</blockquote>
      </div>

      <div className={styles.gridWrap}>
        <div className={styles.grid}>
          {visibleCards.map((m) => (
          <div key={m._id} className={styles.member}>
            <div className={styles.photoWrap}>
              {m.externalPhotoUrl ? (
                <Image
                  src={m.externalPhotoUrl}
                  alt={m.name}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 40vw, 280px"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 18%',
                    transition: 'transform .7s cubic-bezier(.22,1,.36,1)',
                  }}
                  className={styles.photo}
                />
              ) : m.photo ? (
                <Image
                  src={urlFor(m.photo).width(900).height(1100).fit('crop').url()}
                  alt={m.photo.alt ?? m.name}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 40vw, 280px"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 18%',
                    transition: 'transform .7s cubic-bezier(.22,1,.36,1)',
                  }}
                  className={styles.photo}
                />
              ) : (
                <div className={styles.photoPlaceholder} />
              )}
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{m.name}</div>
              {m.bio && (
                <>
                  <div
                    className={`${styles.bio} ${isMobile && !expandedBios[m._id] ? styles.bioCollapsed : ''}`}
                  >
                    {m.bio}
                  </div>
                  {isMobile && (
                    <button
                      type="button"
                      className={styles.bioToggle}
                      onClick={() => toggleBio(m._id)}
                      aria-label={expandedBios[m._id] ? 'Collapse bio' : 'Expand bio'}
                    >
                      <span className={`${styles.bioArrow} ${expandedBios[m._id] ? styles.bioArrowOpen : ''}`}>⌄</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          ))}
        </div>
        {isMobile && canMove && (
          <div className={styles.mobileArrows}>
            <button type="button" className={styles.mobileArrow} onClick={() => move('left')} aria-label="Previous team member">
              ←
            </button>
            <button type="button" className={styles.mobileArrow} onClick={() => move('right')} aria-label="Next team member">
              →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
