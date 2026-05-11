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
    }),
    defineField({
      name: 'customTitle',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => parent?.cardType !== 'custom',
    }),
    defineField({
      name: 'customLocation',
      title: 'Location',
      type: 'string',
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
      hidden: ({ parent }) => parent?.cardType !== 'custom',
      initialValue: '/residences',
    }),
  ],
})
