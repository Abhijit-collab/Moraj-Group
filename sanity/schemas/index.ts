import pressLogo from './pressLogo'
import pressContent from './pressContent'
import homepageDevelopmentCard from './homepageDevelopmentCard'
import iconicProjectCard from './iconicProjectCard'
import iconicProjectsContent from './iconicProjectsContent'
import hero from './hero'
import residence from './residence'
import teamMember from './teamMember'
import testimonial from './testimonial'
import siteSettings from './siteSettings'
import projectDetail from './projectDetail'

/** Object types used by documents must be listed before those documents (Studio resolves `of: [{ type: '…' }]` reliably). */
export const schemaTypes = [
  pressLogo,
  homepageDevelopmentCard,
  iconicProjectCard,
  iconicProjectsContent,
  pressContent,
  hero,
  residence,
  teamMember,
  testimonial,
  siteSettings,
  projectDetail,
]
