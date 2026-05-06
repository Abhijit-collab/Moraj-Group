import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'iconicProjectCard',
  title: 'Iconic Project Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 's3ImageUrl',
      title: 'Image URL (S3)',
      type: 'url',
      description: 'Direct image URL from S3 bucket.',
    }),
    defineField({
      name: 'image',
      title: 'Image (Sanity Upload fallback)',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'image' },
  },
})
