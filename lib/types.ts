export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
}

export interface Slug { current: string }

export interface Hero {
  heading: string
  headingItalic: string
  subheading: string
  ctaLabel: string
  ctaHref: string
  videoLabel?: string
  videoHref?: string
  heroVideoUrl?: string
}

export type ResidenceStatus = 'new-launch' | 'ongoing' | 'completed'

/** Minimal residence fields for homepage / listing tiles (Iconic Developments carousel). */
export interface ResidenceSummary {
  _id: string
  title: string
  slug: Slug
  location: string
  status: ResidenceStatus
  heroImage?: SanityImage | null
  rera?: string
  /** If set, used as the tile link (internal path or absolute URL). */
  href?: string
}

/** Raw row from `siteSettings.homepageDevelopments` in GROQ (before normalizing). */
export interface HomepageDevelopmentCardRaw {
  cardType?: 'residence' | 'custom'
  residence?: (Partial<ResidenceSummary> & { _id?: string }) | null
  customTitle?: string
  customLocation?: string
  customStatus?: ResidenceStatus
  customImage?: SanityImage | null
  customHref?: string
}

export interface IconicProjectCard {
  _key?: string
  title: string
  location: string
  status?: 'upcoming' | 'completed'
  s3ImageUrl?: string
  image?: SanityImage | null
  imageUrl?: string
}

export interface IconicProjectsContent {
  cards?: IconicProjectCard[]
}

export interface ProjectDetailSpec {
  value?: string
  label?: string
}

export interface ProjectDetailLoc {
  title?: string
  value?: string
}

export interface ProjectDetailFloorPlan {
  label?: string
  imageUrl?: string
  image?: SanityImage | null
}

export interface ProjectDetail {
  projectName: string
  slug?: Slug
  heroSubtitle?: string
  heroAddress?: string
  heroBackgroundUrl?: string
  heroBackgroundMediaUrl?: string
  heroPrimaryCtaLabel?: string
  heroPrimaryCtaHref?: string
  heroSecondaryCtaLabel?: string
  heroSecondaryCtaHref?: string
  galleryHeroImageUrl?: string
  galleryThumbs?: SanityImage[]
  galleryMoreText?: string
  specCards?: ProjectDetailSpec[]
  description?: string
  mapEmbedUrl?: string
  mapEmbedCode?: string
  locationHighlights?: ProjectDetailLoc[]
  amenities?: string[]
  floorPlans?: ProjectDetailFloorPlan[]
  price?: string
  priceMeta?: string[]
  reraId?: string
  enquireHeading?: string
}

export interface Residence {
  _id: string
  title: string
  slug: Slug
  location: string
  status: ResidenceStatus
  tag?: string
  heroImage: SanityImage
  gallery?: SanityImage[]
  configuration: string
  area: string
  pricing: string
  description: string
  rera?: string
  amenities?: string[]
  floorplans?: SanityImage[]
}

export interface TeamMember {
  _id: string
  name: string
  bio: string
  photo: SanityImage | null
  externalPhotoUrl?: string
}

export interface Testimonial {
  _id: string
  quote: string
  name: string
  residence: string
  location: string
  rating: number
}

export interface PressLogo {
  _key?: string
  logoUrl: string
  alt?: string
}

export interface PressContent {
  logos?: PressLogo[]
  fallbackPublicationNames?: string[]
}

export interface SiteSettings {
  phone: string
  email: string
  address: string
  officeHours: string
  brandLogo?: SanityImage | null
  brandLogoUrl?: string
  brandLogoExternalUrl?: string
  faviconUrl?: string
  stats: { label: string; value: string; unit: string }[]
  introPhilosophy: string
  introParagraph1: string
  introParagraph2: string
  craftMediaLabel?: string
  craftVideoUrl?: string
  craftVideoFileUrl?: string
  iconicProjects?: IconicProjectCard[]
  homepageDevelopments?: HomepageDevelopmentCardRaw[]
}
