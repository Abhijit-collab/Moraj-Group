import { defineField, defineType } from 'sanity'

/** Single publication logo (e.g. S3 URL) for the Press section. */
export default defineType({
  name: 'pressLogo',
  title: 'Press logo',
  type: 'object',
  fields: [
    defineField({
      name: 'logoUrl',
      title: 'Logo URL (S3)',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ allowRelative: false, scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Publication name for accessibility (e.g. Times of India).',
    }),
  ],
  preview: {
    select: { alt: 'alt', url: 'logoUrl' },
    prepare({ alt, url }) {
      return { title: alt || 'Press logo', subtitle: url }
    },
  },
})
