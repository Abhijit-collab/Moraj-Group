import Nav from '@/components/sections/Nav'
import ScrollRevealObserver from '@/components/animations/ScrollRevealObserver'
import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import type { SiteSettings } from '@/lib/types'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = isSanityConfigured
    ? await getSanityClient().fetch<SiteSettings>(siteSettingsQuery)
    : devHomepageContent.settings
  const brandLogoSrc = settings?.brandLogoExternalUrl?.trim() || settings?.brandLogoUrl?.trim()
  const brandLogoFallbackSrc = settings?.brandLogoUrl?.trim() || settings?.brandLogoExternalUrl?.trim()
  const brandLogoAlt = settings?.brandLogo?.alt ?? 'Moraj logo'

  return (
    <>
      <ScrollRevealObserver />
      <Nav
        brandLogoSrc={brandLogoSrc}
        brandLogoFallbackSrc={brandLogoFallbackSrc}
        brandLogoAlt={brandLogoAlt}
      />
      <main>{children}</main>
    </>
  )
}
