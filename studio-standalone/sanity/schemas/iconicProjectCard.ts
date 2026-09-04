import { defineField, defineType } from 'sanity'
import { IconicProjectCardInput } from '../components/IconicProjectCardInput'

export default defineType({
  name: 'iconicProjectCard',
  title: 'Iconic Project Card',
  type: 'object',
  components: {
    input: IconicProjectCardInput,
  },
  fields: [
    defineField({ name: 'title', title: 'Project Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'status',
      title: 'Property Status',
      type: 'string',
      description: 'Optional. Shown on the card badge and used for Upcoming / Ongoing / Completed tabs on the site.',
      initialValue: 'upcoming',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'completionYear',
      title: 'Year of Completion',
      type: 'number',
      description:
        'Used to order cards. Most recent year shows first. On Residences “All”, order is Upcoming → Ongoing → Completed, then by this year within each group.',
      validation: (r) => r.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'configuration',
      title: 'Configuration',
      type: 'string',
      description: 'Optional. e.g. 3 & 4 BHK',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'string',
      description: 'Optional. e.g. Jun 2031',
    }),
    defineField({
      name: 'reraId',
      title: 'RERA ID',
      type: 'string',
      description: 'Optional',
    }),
    defineField({
      name: 'area',
      title: 'Area',
      type: 'string',
      description: 'Optional. e.g. 980 - 1540 sq.ft.',
    }),
    defineField({
      name: 'detailSlug',
      title: 'Detail Page Slug',
      type: 'string',
      description: 'Optional. Slug of the Project Detail page (e.g. moraj-opulence). Leave empty if no detail page exists.',
    }),
    defineField({ name: 's3ImageUrl', title: 'Image URL (S3)', type: 'url' }),
    defineField({
      name: 'image',
      title: 'Image (Sanity Upload fallback)',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'image',
      status: 'status',
    },
    prepare: ({ title, subtitle, media, status }) => ({
      title: title || 'Untitled project',
      subtitle: [status, subtitle].filter(Boolean).join(' · '),
      media,
    }),
  },
})
