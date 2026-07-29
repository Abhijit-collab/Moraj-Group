import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingItalic',
      title: 'Italic Ending (highlighted)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'e.g. Navi Mumbai\'s Trusted Developer · Est. 1985',
    }),
    defineField({ name: 'ctaLabel', title: 'Primary Button Label', type: 'string', initialValue: 'Explore Residences' }),
    defineField({ name: 'ctaHref', title: 'Primary Button Link', type: 'string', initialValue: '/residences' }),
    defineField({
      name: 'videoHref',
      title: 'Hero Background Video URL',
      type: 'url',
      description: 'Direct video file URL (recommended: mp4/webm).',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video (Upload)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Preferred over URL. Upload mp4/webm directly to Sanity.',
    }),
    defineField({
      name: 'stats',
      title: 'Homepage Stats',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'value', title: 'Number', type: 'string' }), defineField({ name: 'unit', title: 'Unit / Symbol', type: 'string' }), defineField({ name: 'label', title: 'Label', type: 'string' })] }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Hero — ${title}` }),
  },
})
