import { groq } from 'next-sanity'

// ─── Hero ───────────────────────────────────
export const heroQuery = groq`
  *[_type == "hero"][0] {
    heading,
    headingItalic,
    subheading,
    ctaLabel,
    ctaHref,
    videoLabel,
    videoHref,
    "heroVideoUrl": heroVideo.asset->url,
  }
`

// ─── Residences (all, for homepage grid) ────
export const residencesQuery = groq`
  *[_type == "residence"] | order(order asc) {
    _id,
    title,
    slug,
    location,
    status,
    tag,
    heroImage,
    configuration,
    area,
    pricing,
    description,
    rera,
  }
`

// ─── Single residence ────────────────────────
export const residenceBySlugQuery = groq`
  *[_type == "residence" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    location,
    status,
    tag,
    heroImage,
    gallery,
    configuration,
    area,
    pricing,
    description,
    rera,
    amenities,
    floorplans,
  }
`

// ─── Team ────────────────────────────────────
export const teamQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    bio,
    photo,
    externalPhotoUrl,
  }
`

// ─── Testimonials ────────────────────────────
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc)[0...4] {
    _id,
    quote,
    name,
    residence,
    location,
    rating,
  }
`

export const blogPostsQuery = groq`
  *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    slug,
    "contentText": pt::text(content),
    author,
    publishedAt,
    coverImage,
    "coverImageUrl": coverImage.asset->url,
    coverImageExternalUrl
  }
`

export const iconicProjectsContentQuery = groq`
  *[_type == "iconicProjectsContent" && _id == "iconicProjectsContent"][0] {
    cards[]{
      _key,
      title,
      location,
      status,
      s3ImageUrl,
      image,
      "imageUrl": image.asset->url
    }
  }
`

export const pressContentQuery = groq`
  *[_type == "pressContent" && _id == "pressContent"][0] {
    logos[]{
      _key,
      logoUrl,
      alt
    },
    fallbackPublicationNames
  }
`

export const projectDetailBySlugQuery = groq`
  *[_type == "projectDetail" && slug.current == $slug][0] {
    projectName,
    slug,
    heroSubtitle,
    heroAddress,
    heroBackgroundUrl,
    "heroBackgroundMediaUrl": heroBackgroundMedia.asset->url,
    heroPrimaryCtaLabel,
    heroPrimaryCtaHref,
    heroSecondaryCtaLabel,
    heroSecondaryCtaHref,
    "galleryHeroImageUrl": coalesce(galleryHeroImageUrl, galleryHeroImage.asset->url),
    galleryThumbs[] {
      _type,
      asset,
      alt
    },
    galleryMoreText,
    specCards[] {
      value,
      label
    },
    description,
    mapEmbedUrl,
    mapEmbedCode,
    locationHighlights[] {
      title,
      value
    },
    amenities,
    floorPlans[] {
      label,
      imageUrl,
      image
    },
    price,
    priceMeta,
    reraId,
    enquireHeading
  }
`

// ─── Site Settings ───────────────────────────
export const siteFaviconQuery = groq`*[_type == "siteSettings"][0].faviconUrl`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    phone,
    email,
    address,
    officeHours,
    brandLogo,
    "brandLogoUrl": brandLogo.asset->url,
    brandLogoExternalUrl,
    faviconUrl,
    stats,
    introPhilosophy,
    introParagraph1,
    introParagraph2,
    craftMediaLabel,
    craftVideoUrl,
    "craftVideoFileUrl": craftVideo.asset->url,
    iconicProjects[]{
      _key,
      title,
      location,
      status,
      s3ImageUrl,
      image,
      "imageUrl": image.asset->url
    },
    homepageDevelopments[]{
      cardType,
      "residence": residence->{
        _id,
        title,
        slug,
        location,
        status,
        heroImage,
        rera
      },
      customTitle,
      customLocation,
      customStatus,
      customImage,
      customHref
    },
  }
`
