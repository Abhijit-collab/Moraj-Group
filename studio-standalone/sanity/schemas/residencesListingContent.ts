import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'residencesListingContent',
  title: 'Residences Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'cards',
      title: 'Project Cards',
      type: 'array',
      description:
        'Same fields as Iconic Developments. Cards shown on /residences. Publishing also copies/updates matching cards into Iconic Projects Content (does not delete Iconic cards).',
      of: [{ type: 'iconicProjectCard' }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Residences Page Content' }),
  },
})
