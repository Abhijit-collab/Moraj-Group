import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'bio', title: 'Short Bio', type: 'text', rows: 3 }),
    defineField({ name: 'photo', title: 'Portrait Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'externalPhotoUrl', title: 'External Photo URL (S3)', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
})
