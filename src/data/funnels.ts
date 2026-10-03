export type FunnelTag = 'Work project' | 'Personal venture'

export type Funnel = {
  file: string
  label: string
  tag: FunnelTag
  desc: string
  /** Public subfolder the HTML + thumbnail live under. Default 'funnels'. */
  dir?: 'funnels' | 'samples'
}

/**
 * The project case-study pages. Each is a page in public/samples/ and opens
 * full size from the Projects page (the 3D carousel and the build cards).
 *
 * To add one: drop the page's HTML in public/samples/, add an entry here,
 * then run `node scripts/make-thumbs.mjs` to render its thumbnails.
 */
const page = (file: string, label: string, tag: FunnelTag, desc: string): Funnel => ({
  file,
  label,
  tag,
  desc,
  dir: 'samples',
})

export const caseStudies: Funnel[] = [
  page(
    'fms.html',
    'FMS - Facility Management System',
    'Work project',
    'Equipment and requests with role-based access and two-level approval. I worked on it as developer, QA and release coordinator.',
  ),
  page(
    'expense.html',
    'Expense Management System',
    'Work project',
    'Project Manager, coordinating the team from development through UAT and production release, using AI-Driven Development.',
  ),
  page(
    'spacee.html',
    'Spacee - Rental Room & Office Platform',
    'Work project',
    'NestJS backend and API work for a platform listing rooms and office spaces in Japan.',
  ),
  page(
    'nfc.html',
    'NFC Touchpoints',
    'Personal venture',
    'NFC cards for businesses, with a URL for each touchpoint that leads to reviews, social pages and leads.',
  ),
  page(
    'dangling-co.html',
    'Dangling Co',
    'Personal venture',
    'A handmade accessories business. I run the website and the operations behind it.',
  ),
]

/** Find a case study by its file name. */
export const caseStudy = (file: string) => caseStudies.find((c) => c.file === file)!

/**
 * Tag -> color map. Passed to CSS via an inline --tag-color custom property.
 */
export const tagColors: Record<FunnelTag, string> = {
  'Work project': '#FF7A1A',
  'Personal venture': '#8b5cf6',
}
