import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', initialValue: '+91 98205 77144' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string', initialValue: 'sales@morajinfratech.com' }),
    defineField({ name: 'address', title: 'Office Address', type: 'text', rows: 2 }),
    defineField({ name: 'officeHours', title: 'Office Hours', type: 'string', initialValue: 'Monday – Saturday · 9am – 7pm' }),
    defineField({ name: 'brandLogo', title: 'Brand Logo (Sanity Upload)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'brandLogoExternalUrl', title: 'Brand Logo URL (S3)', type: 'url' }),
    defineField({
      name: 'faviconUrl',
      title: 'Favicon URL (S3)',
      type: 'url',
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    }),
    defineField({ name: 'introPhilosophy', title: 'Intro — Section Label', type: 'string', initialValue: 'Our Philosophy' }),
    defineField({ name: 'introParagraph1', title: 'Intro — Paragraph 1', type: 'text', rows: 3 }),
    defineField({ name: 'introParagraph2', title: 'Intro — Paragraph 2', type: 'text', rows: 3 }),
    defineField({ name: 'homepageDevelopments', title: 'Homepage — Iconic Developments', type: 'array', of: [{ type: 'homepageDevelopmentCard' }] }),
    defineField({ name: 'iconicProjects', title: 'Homepage Content — Iconic Project Cards', type: 'array', of: [{ type: 'iconicProjectCard' }] }),
    defineField({ name: 'craftHeading', title: 'Craftsmanship — Heading', type: 'string', initialValue: 'Built in-house. Finished with pride.' }),
    defineField({ name: 'craftMediaLabel', title: 'Craftsmanship — Media Label', type: 'string', initialValue: 'Now Launching in Panvel–Sanpada' }),
    defineField({ name: 'craftVideoUrl', title: 'Craftsmanship — Video URL (S3)', type: 'url' }),
    defineField({ name: 'craftVideo', title: 'Craftsmanship — Video (Upload)', type: 'file', options: { accept: 'video/mp4,video/webm' } }),
    defineField({ name: 'craftParagraph1', title: 'Craftsmanship — Paragraph 1', type: 'text', rows: 3 }),
    defineField({ name: 'craftParagraph2', title: 'Craftsmanship — Paragraph 2', type: 'text', rows: 3 }),
    defineField({
      name: 'craftValues',
      title: 'Craftsmanship — Value Points',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'title', title: 'Title', type: 'string' }), defineField({ name: 'body', title: 'Description', type: 'string' })] }],
    }),
    defineField({ name: 'legacyQuote', title: 'Legacy — Founder Quote', type: 'text', rows: 2 }),
    defineField({ name: 'enquireHeading', title: 'Enquire — Heading', type: 'string' }),
    defineField({ name: 'enquireSub', title: 'Enquire — Subtext', type: 'text', rows: 2 }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
