import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageDevelopmentCard',
  title: 'Homepage development card',
  type: 'object',
  fields: [
    defineField({
      name: 'cardType',
      title: 'Card type',
      type: 'string',
      options: {
        list: [
          { title: 'Link to a Residence', value: 'residence' },
          { title: 'Custom card', value: 'custom' },
        ],
        layout: 'radio',
      },
      initialValue: 'residence',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'residence',
      title: 'Residence',
      type: 'reference',
      to: [{ type: 'residence' }],
      hidden: ({ parent }) => parent?.cardType !== 'residence',
      validation: (r) =>
        r.custom((_, ctx) => {
          const parent = ctx.parent as { cardType?: string }
          if (parent?.cardType === 'residence' && !_) return 'Select a residence'
          return true
        }),
    }),
    defineField({
      name: 'customTitle',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => parent?.cardType !== 'custom',
      validation: (r) =>
        r.custom((val, ctx) => {
          const parent = ctx.parent as { cardType?: string }
          if (parent?.cardType === 'custom' && !val?.trim()) return 'Title is required'
          return true
        }),
    }),
    defineField({
      name: 'customLocation',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Panvel, Navi Mumbai"',
      hidden: ({ parent }) => parent?.cardType !== 'custom',
    }),
    defineField({
      name: 'customStatus',
      title: 'Status',
      type: 'string',
      hidden: ({ parent }) => parent?.cardType !== 'custom',
      options: {
        list: [
          { title: 'New Launch', value: 'new-launch' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'ongoing',
    }),
    defineField({
      name: 'customImage',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      hidden: ({ parent }) => parent?.cardType !== 'custom',
    }),
    defineField({
      name: 'customHref',
      title: 'Link',
      type: 'string',
      description: 'Internal path (e.g. /residences/slug) or full URL.',
      hidden: ({ parent }) => parent?.cardType !== 'custom',
      initialValue: '/residences',
    }),
  ],
  preview: {
    select: { cardType: 'cardType', title: 'customTitle', residenceTitle: 'residence.title' },
    prepare({ cardType, title, residenceTitle }) {
      return {
        title: cardType === 'residence' ? residenceTitle || 'Residence' : title || 'Custom card',
        subtitle: cardType === 'residence' ? 'Residence' : 'Custom',
      }
    },
  },
})
