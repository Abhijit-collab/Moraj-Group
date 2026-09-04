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
  videoHref?: string
  heroVideoUrl?: string
  mobileVideoHref?: string
  heroMobileVideoUrl?: string
  stats?: { value: string; unit: string; label: string }[]
}

export interface IconicProjectCard {
  _key?: string
  title: string
  location: string
  status?: 'upcoming' | 'ongoing' | 'completed'
  configuration?: string
  endDate?: string
  reraId?: string
  area?: string
  detailSlug?: string
  s3ImageUrl?: string
  image?: SanityImage | null
  imageUrl?: string
}

export interface IconicProjectsContent {
  cards?: IconicProjectCard[]
}

export interface ResidencesListingContent {
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
  galleryImages?: { imageUrl?: string; uploadUrl?: string }[]
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

export interface BlogPost {
  _id: string
  title: string
  slug: Slug
  excerpt?: string
  contentText?: string
  author?: string
  publishedAt?: string
  coverImage?: SanityImage | null
  coverImageUrl?: string
  coverImageExternalUrl?: string
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

export interface CareerContent {
  heroImageExternalUrl?: string
  heroImage?: SanityImage | null
  heroImageUrl?: string
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
}
