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
      validation: (r) => r.required().max(32),
    }),
    defineField({
      name: 'residence',
      title: 'Project Name',
      type: 'string',
      description: 'e.g. "Moraj Opulence"',
      validation: (r) => r.max(42),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Panvel"',
      validation: (r) => r.max(28),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      description: 'Keep it concise so it fits the testimonial card layout.',
      validation: (r) => r.required().max(220),
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
