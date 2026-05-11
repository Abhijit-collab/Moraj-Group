import { defineField, defineType } from 'sanity'

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
    defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
  ],
})
