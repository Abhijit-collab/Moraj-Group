import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectDetail',
  title: 'Project Detail Page',
  type: 'document',
  fields: [
    defineField({ name: 'projectName', title: 'Project Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'projectName', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string', initialValue: '3 & 4 BHK Residences' }),
    defineField({
      name: 'heroMeta',
      title: 'Hero Meta',
      type: 'string',
      description: 'Short meta line under the hero (e.g. location · config · RERA)',
    }),
    defineField({ name: 'heroAddress', title: 'Hero Address', type: 'string' }),
    defineField({ name: 'heroBackgroundUrl', title: 'Hero Background URL (S3)', type: 'url' }),
    defineField({ name: 'heroBackgroundMedia', title: 'Hero Background Media (Upload)', type: 'file', options: { accept: 'image/*,video/mp4,video/webm' } }),
    defineField({ name: 'heroPrimaryCtaLabel', title: 'Hero Primary CTA Label', type: 'string', initialValue: 'Book a Site Visit' }),
    defineField({ name: 'heroPrimaryCtaHref', title: 'Hero Primary CTA Link', type: 'string', initialValue: '#enquire' }),
    defineField({ name: 'heroSecondaryCtaLabel', title: 'Hero Secondary CTA Label', type: 'string', initialValue: 'Download Brochure' }),
    defineField({ name: 'heroSecondaryCtaHref', title: 'Hero Secondary CTA Link', type: 'string', initialValue: '#' }),
    defineField({
      name: 'projectWebsiteUrl',
      title: 'Dedicated Project Website URL',
      type: 'url',
      description: 'Shown below Book a Site Visit / Download Brochure as “Visit Project Website”. Opens in a new tab. Leave empty to hide.',
    }),
    defineField({ name: 'galleryHeroImageUrl', title: 'Gallery Hero Image URL (S3)', type: 'url' }),
    defineField({ name: 'galleryHeroImage', title: 'Gallery Hero Image (Upload)', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      description: 'Add multiple gallery photos. Use S3 URL and/or upload. The first item is the large image; the rest are thumbnails.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'imageUrl', title: 'Image URL (S3)', type: 'url' }),
            defineField({ name: 'image', title: 'Image (Upload)', type: 'image', options: { hotspot: true } }),
          ],
          preview: {
            select: { url: 'imageUrl', media: 'image' },
            prepare: ({ url, media }) => ({
              title: url || 'Gallery image',
              media,
            }),
          },
        },
      ],
    }),
    defineField({ name: 'galleryThumbs', title: 'Gallery Thumbnails (Upload fallback)', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({
      name: 'galleryMoreText',
      title: 'Gallery More Text (unused — site counts remaining photos automatically)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'specCards',
      title: 'Spec Cards',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'value', title: 'Value', type: 'string' }), defineField({ name: 'label', title: 'Label', type: 'string' })] }],
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'mapEmbedUrl', title: 'Google Map Embed URL', type: 'text', rows: 3 }),
    defineField({ name: 'mapEmbedCode', title: 'Google Map Embed Code', type: 'text', rows: 4 }),
    defineField({
      name: 'locationHighlights',
      title: 'Location Highlights',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'title', title: 'Title', type: 'string' }), defineField({ name: 'value', title: 'Value', type: 'string' })] }],
    }),
    defineField({ name: 'amenities', title: 'Amenities', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({
      name: 'floorPlans',
      title: 'Floor Plans',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'label', title: 'Label', type: 'string' }), defineField({ name: 'imageUrl', title: 'Image URL (S3)', type: 'url' }), defineField({ name: 'image', title: 'Image (Upload)', type: 'image', options: { hotspot: true } })] }],
    }),
    defineField({ name: 'price', title: 'Price', type: 'string', initialValue: '₹ 1.85 Cr' }),
    defineField({ name: 'priceMeta', title: 'Price Meta', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'reraId', title: 'RERA ID', type: 'string' }),
    defineField({ name: 'enquireHeading', title: 'Enquire Card Heading', type: 'string', initialValue: 'Interested in this project?' }),
  ],
})
