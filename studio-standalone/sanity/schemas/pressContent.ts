import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pressContent',
  title: 'Press',
  type: 'document',
  fields: [
    defineField({
      name: 'logos',
      title: 'Publication logos (S3)',
      type: 'array',
      of: [{ type: 'pressLogo' }],
    }),
    defineField({
      name: 'fallbackPublicationNames',
      title: 'Publication names (fallback)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      hidden: ({ parent }) => Array.isArray(parent?.logos) && parent.logos.length > 0,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Press' }),
  },
})
