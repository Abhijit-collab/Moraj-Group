import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import { siteFaviconQuery } from '@/lib/queries'
import './globals.css'

const baseMetadata: Metadata = {
  title: { default: 'Moraj Group — Crafting Homes That Define Generations', template: '%s | Moraj Group' },
  description: 'Since 1985, Moraj Group has shaped the residential landscape of Navi Mumbai. Discover iconic residences built with integrity, craftsmanship and care.',
  keywords: ['Moraj Group', 'Navi Mumbai real estate', 'luxury apartments Panvel', 'Moraj Opulence', 'residential developer Navi Mumbai'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Moraj Group',
    title: 'Moraj Group — Crafting Homes That Define Generations',
    description: 'Navi Mumbai\'s most trusted residential developer since 1985.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured) {
    return baseMetadata
  }
  try {
    const faviconUrl = await getSanityClient().fetch<string | null>(siteFaviconQuery)
    if (faviconUrl) {
      return {
        ...baseMetadata,
        icons: { icon: faviconUrl, shortcut: faviconUrl, apple: faviconUrl },
      }
    }
  } catch {
    // Studio or network unavailable — use defaults
  }
  return baseMetadata
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
