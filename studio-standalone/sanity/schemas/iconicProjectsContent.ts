import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'iconicProjectsContent',
  title: 'Iconic Projects Content',
  type: 'document',
  fields: [
    defineField({
      name: 'cards',
      title: 'Project Cards',
      type: 'array',
      description:
        'Same fields as Residences Page Content. Cards shown in Iconic Developments on the homepage. Use “Copy to Residences” to copy/update matching cards into Residences Page Content (does not delete Residences cards).',
      of: [{ type: 'iconicProjectCard' }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Iconic Projects Content' }),
  },
})
