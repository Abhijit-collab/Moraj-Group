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
      title: 'Hero Background Video URL (Desktop)',
      type: 'url',
      description: 'Horizontal / landscape video for desktop and tablet. Direct file URL (mp4/webm).',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video Upload (Desktop)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Preferred over desktop URL. Upload mp4/webm directly to Sanity.',
    }),
    defineField({
      name: 'mobileVideoHref',
      title: 'Hero Background Video URL (Mobile / Vertical)',
      type: 'url',
      description: 'Vertical / portrait video for phone screens. Direct file URL (mp4/webm). Falls back to desktop video if empty.',
    }),
    defineField({
      name: 'heroMobileVideo',
      title: 'Hero Background Video Upload (Mobile / Vertical)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Preferred over mobile URL. Upload a vertical mp4/webm for phones.',
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
