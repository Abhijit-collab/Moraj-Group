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
      title: 'Project Status',
      type: 'string',
      initialValue: 'upcoming',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      initialValue: 'RESIDENTIAL',
      options: {
        list: [
          { title: 'Residential', value: 'RESIDENTIAL' },
          { title: 'Commercial', value: 'COMMERCIAL' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'configuration', title: 'Configuration', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'endDate', title: 'End Date', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'reraId', title: 'RERA ID', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'area', title: 'Area', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'detailSlug',
      title: 'Detail Page Slug',
      type: 'string',
      description: 'Slug of the Project Detail page (e.g. moraj-opulence). Leave empty if no detail page exists.',
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
