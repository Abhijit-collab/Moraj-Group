import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'careerContent',
  title: 'Career Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImageExternalUrl',
      title: 'Hero Image URL (S3)',
      type: 'url',
      description: 'If provided, this S3 URL is used as the Career page hero image.',
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (Direct Upload)',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      description: 'Upload directly in Sanity. Used when the S3 URL is empty.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Career Page' }),
  },
})
