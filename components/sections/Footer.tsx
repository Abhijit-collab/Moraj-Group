import type { SiteSettings } from '@/lib/types'
import Image from 'next/image'
import styles from './Footer.module.css'

interface Props { settings: SiteSettings | null }

const ADOPTXR_LOGO_DARK =
  'https://d3deuzgnmq8y32.cloudfront.net/adoptXR-logo/AdoptXR+Logo_dark.png'

export default function Footer({ settings }: Props) {
  const brandLogoSrc = settings?.brandLogoUrl?.trim() || settings?.brandLogoExternalUrl?.trim()
  const brandLogoAlt = settings?.brandLogo?.alt ?? 'Moraj logo'

  return (
    <footer className={styles.footer} data-reveal data-reveal-stagger="true">
      <div className={styles.top}>
        <div>
          <div className={styles.logoRow}>
            {brandLogoSrc && (
              <Image
                src={brandLogoSrc}
                alt={brandLogoAlt}
                width={180}
                height={90}
                className={styles.logoIcon}
                sizes="180px"
              />
            )}
          </div>
          <div className={styles.logoSub}>Group · Est. 1985</div>
          <p className={styles.desc}>
            A legacy of trust and excellence since 1985.<br />
            Navi Mumbai&apos;s most respected residential developer.
          </p>
        </div>

        <div>
          <div className={styles.colHead}>Contact</div>
          <ul className={styles.colList}>
            <li className={styles.contactAddress}>
              {settings?.address ?? '18th Floor, The Affaires,\nSanpada, Navi Mumbai 400705'}
            </li>
            <li>
              <a href={`tel:${settings?.phone}`} className={styles.contactPhone}>
                {settings?.phone ?? '+91 98205 77144'}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings?.email}`} className={styles.contactEmail}>
                {settings?.email ?? 'sales@morajinfratech.com'}
              </a>
            </li>
          </ul>
        </div>

        <a
          href="https://adoptxr.com"
          className={styles.poweredBy}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Powered by AdoptXR"
        >
          <span className={styles.poweredByLabel}>Powered by</span>
          <Image
            src={ADOPTXR_LOGO_DARK}
            alt="AdoptXR"
            width={320}
            height={88}
            className={styles.poweredByLogo}
            sizes="(max-width: 768px) 240px, 320px"
          />
        </a>
      </div>

      <div className={styles.bar}>
        <span className={styles.copy}>© {new Date().getFullYear()} Moraj Infratech Pvt. Ltd. All rights reserved.</span>
        <div className={styles.legal}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>
      </div>
    </footer>
  )
}
