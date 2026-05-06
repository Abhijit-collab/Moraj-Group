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
      description: 'e.g. "Where every home tells a story of"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingItalic',
      title: 'Italic Ending (highlighted)',
      type: 'string',
      description: 'e.g. "enduring craft." — shown in italic style',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Small text above headline — e.g. "Navi Mumbai\'s Trusted Developer · Est. 1985"',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Primary Button Label',
      type: 'string',
      initialValue: 'Explore Residences',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Primary Button Link',
      type: 'string',
      initialValue: '/residences',
    }),
    defineField({
      name: 'videoLabel',
      title: 'Video Button Label',
      type: 'string',
      initialValue: 'Watch our story',
    }),
    defineField({
      name: 'videoHref',
      title: 'Hero Background Video URL',
      type: 'url',
      description: 'Direct video file URL (recommended: mp4/webm). This is used as the hero background source.',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video (Upload)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Preferred over URL. Upload mp4/webm directly to Sanity.',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Hero — ${title}` }),
  },
})
