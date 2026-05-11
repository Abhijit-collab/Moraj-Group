import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'residence',
  title: 'Residence',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New Launch', value: 'new-launch' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'location', title: 'Location', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'heroImage',
      title: 'Hero / Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'configuration', title: 'Configuration', type: 'string' }),
    defineField({ name: 'area', title: 'Area Range', type: 'string' }),
    defineField({ name: 'pricing', title: 'Pricing', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'rera', title: 'RERA Number', type: 'string' }),
    defineField({ name: 'amenities', title: 'Amenities', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'floorplans', title: 'Floor Plan Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
  ],
})
