import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectDetail',
  title: 'Project Detail Page',
  type: 'document',
  fields: [
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'projectName', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Line shown below project title (example: 3 & 4 BHK Residences).',
      initialValue: '3 & 4 BHK Residences',
    }),
    defineField({
      name: 'heroAddress',
      title: 'Hero Address',
      type: 'string',
      description: 'Address line shown below project title in hero.',
    }),
    defineField({
      name: 'heroBackgroundUrl',
      title: 'Hero Background URL (S3)',
      type: 'url',
      description: 'Optional external image/video URL.',
    }),
    defineField({
      name: 'heroBackgroundMedia',
      title: 'Hero Background Media (Upload from local PC)',
      type: 'file',
      options: { accept: 'image/*,video/mp4,video/webm' },
      description: 'Alternative to S3 URL.',
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Hero Primary CTA Label',
      type: 'string',
      initialValue: 'Book a Site Visit',
    }),
    defineField({
      name: 'heroPrimaryCtaHref',
      title: 'Hero Primary CTA Link',
      type: 'string',
      initialValue: '#enquire',
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Hero Secondary CTA Label',
      type: 'string',
      initialValue: 'Download Brochure',
    }),
    defineField({
      name: 'heroSecondaryCtaHref',
      title: 'Hero Secondary CTA Link',
      type: 'string',
      initialValue: '#',
    }),
    defineField({
      name: 'galleryHeroImageUrl',
      title: 'Gallery Hero Image URL (S3)',
      type: 'url',
    }),
    defineField({
      name: 'galleryHeroImage',
      title: 'Gallery Hero Image (Upload)',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'galleryThumbs',
      title: 'Gallery Thumbnails',
      type: 'array',
      of: [
        defineField({
          name: 'thumb',
          title: 'Thumbnail',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'galleryMoreText',
      title: 'Gallery More Text',
      type: 'string',
      initialValue: '+ 16 more photos',
    }),
    defineField({
      name: 'specCards',
      title: 'Spec Cards',
      type: 'array',
      of: [
        defineField({
          name: 'spec',
          title: 'Spec',
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Map Embed (iframe code or src URL)',
      type: 'text',
      rows: 3,
      description:
        'Paste full Google Maps iframe code OR only the embed src URL. Example: <iframe src="https://www.google.com/maps/embed?..."></iframe>',
    }),
    defineField({
      name: 'mapEmbedCode',
      title: 'Google Map Embed Code (recommended)',
      type: 'text',
      rows: 4,
      description:
        'If URL field still validates, paste iframe embed code here. This field accepts raw HTML embed snippets.',
    }),
    defineField({
      name: 'locationHighlights',
      title: 'Location Highlights',
      type: 'array',
      of: [
        defineField({
          name: 'loc',
          title: 'Highlight',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: { select: { title: 'title', subtitle: 'value' } },
        }),
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'floorPlans',
      title: 'Floor Plans',
      type: 'array',
      of: [
        defineField({
          name: 'plan',
          title: 'Plan',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'imageUrl', title: 'Image URL (S3)', type: 'url' }),
            defineField({
              name: 'image',
              title: 'Image (Upload)',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
            }),
          ],
          preview: { select: { title: 'label', media: 'image' } },
        }),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      initialValue: '₹ 1.85 Cr',
    }),
    defineField({
      name: 'priceMeta',
      title: 'Price Meta (4 items recommended)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'reraId',
      title: 'RERA ID',
      type: 'string',
    }),
    defineField({
      name: 'enquireHeading',
      title: 'Enquire Card Heading',
      type: 'string',
      initialValue: 'Interested in this project?',
    }),
  ],
  preview: {
    select: { title: 'projectName', subtitle: 'slug.current' },
  },
})
