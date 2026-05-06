import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const isSanityConfigured = Boolean(projectId)

if (!isSanityConfigured && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.warn(
    '[Moraj] No NEXT_PUBLIC_SANITY_PROJECT_ID — using built-in copy for local dev. Add .env.local when your Sanity project is ready.'
  )
}

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
      token: process.env.SANITY_API_TOKEN,
    })
  : null

const builder = client ? imageUrlBuilder(client) : null

const placeholderImageChain = {
  width: () => placeholderImageChain,
  height: () => placeholderImageChain,
  fit: () => placeholderImageChain,
  url: () => '/hero-poster.jpg',
}

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  if (!builder) {
    return placeholderImageChain as unknown as ImageUrlBuilder
  }
  return builder.image(source)
}

export function getSanityClient(): SanityClient {
  if (!client) {
    throw new Error(
      'Sanity: set NEXT_PUBLIC_SANITY_PROJECT_ID (letters, numbers, and dashes only). Get it from sanity.io → Project → API.'
    )
  }
  return client
}
