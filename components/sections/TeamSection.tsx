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

      <div className={styles.grid}>
        {cards.map((m) => (
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
              {m.bio && <div className={styles.bio}>{m.bio}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
