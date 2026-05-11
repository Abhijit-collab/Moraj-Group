import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'iconicProjectsContent',
  title: 'Iconic Projects Content',
  type: 'document',
  fields: [
    defineField({
      name: 'cards',
      title: 'Iconic Project Cards',
      type: 'array',
      of: [{ type: 'iconicProjectCard' }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Iconic Projects Content' }),
  },
})
