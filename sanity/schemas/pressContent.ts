import { defineField, defineType } from 'sanity'

/** Singleton: “As featured in” logos and optional text fallback. */
export default defineType({
  name: 'pressContent',
  title: 'Press',
  type: 'document',
  fields: [
    defineField({
      name: 'logos',
      title: 'Publication logos (S3)',
      description: 'If this list has items, the homepage shows these images instead of the text names below.',
      type: 'array',
      of: [{ type: 'pressLogo' }],
    }),
    defineField({
      name: 'fallbackPublicationNames',
      title: 'Publication names (fallback)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Plain text labels for “As featured in”. Used only when “Publication logos” is empty.',
      hidden: ({ parent }) => Array.isArray(parent?.logos) && parent.logos.length > 0,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Press' }),
  },
})
