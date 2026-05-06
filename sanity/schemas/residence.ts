import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'residence',
  title: 'Residence',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      description: 'e.g. "Moraj Opulence"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first. e.g. 1, 2, 3, 4',
    }),
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
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Panvel, Navi Mumbai"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'configuration',
      title: 'Configuration',
      type: 'string',
      description: 'e.g. "2 & 3 BHK"',
    }),
    defineField({
      name: 'area',
      title: 'Area Range',
      type: 'string',
      description: 'e.g. "850 – 1400 sq. ft."',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'string',
      description: 'e.g. "On request" or "₹ 85L – ₹ 1.2Cr"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'rera',
      title: 'RERA Number',
      type: 'string',
      description: 'e.g. "P52000001234"',
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'floorplans',
      title: 'Floor Plan Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Floor Plan Label', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'heroImage' },
  },
})
