import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Resident Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'residence',
      title: 'Project Name',
      type: 'string',
      description: 'e.g. "Moraj Opulence"',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Panvel"',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1–5)',
      type: 'number',
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'residence' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `${subtitle}` }),
  },
})
