import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import {
  createPublishAndSyncAction,
  CopyIconicToResidencesAction,
  SyncResidencesToIconicAction,
} from './sanity/actions/syncResidencesToIconic'

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID?.trim() ||
  process.env.SANITY_PROJECT_ID?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ||
  ''
const dataset =
  process.env.SANITY_STUDIO_DATASET?.trim() ||
  process.env.SANITY_DATASET?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  'production'

export default defineConfig({
  name: 'default',
  title: 'Moraj Group CMS',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Hero Section')
              .id('hero')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero')
              ),
            S.divider(),
            S.listItem()
              .title('Iconic Projects Content')
              .id('iconicProjectsContent')
              .child(
                S.document()
                  .schemaType('iconicProjectsContent')
                  .documentId('iconicProjectsContent')
              ),
            S.listItem()
              .title('Residences Page Content')
              .id('residencesListingContent')
              .child(
                S.document()
                  .schemaType('residencesListingContent')
                  .documentId('residencesListingContent')
              ),
            S.listItem()
              .title('Press')
              .id('pressContent')
              .child(
                S.document()
                  .schemaType('pressContent')
                  .documentId('pressContent')
              ),
            S.documentTypeListItem('blogPost').title('Blogs'),
            S.listItem()
              .title('Career Page')
              .id('careerContent')
              .child(
                S.document()
                  .schemaType('careerContent')
                  .documentId('careerContent')
              ),
            S.documentTypeListItem('projectDetail').title('Project Detail Pages'),
            S.documentTypeListItem('teamMember').title('Team Members'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'residencesListingContent') {
        return prev
          .map((action) => {
            if (action.action === 'publish') {
              return createPublishAndSyncAction(action)
            }
            return action
          })
          .concat([SyncResidencesToIconicAction])
      }

      if (context.schemaType === 'iconicProjectsContent') {
        return prev.concat([CopyIconicToResidencesAction])
      }

      return prev
    },
  },
})
