/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline.
 *
 * Page-specific copy (projects, services, FAQs) lives in the other files in
 * src/data/ and at the top of each view component.
 */

import { Briefcase, Stack, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Mark Jason Delima',
  firstName: 'Mark Jason',
  handle: 'Project Manager & Full-Stack Developer',
  role: 'Philippines',
  avatarSrc: '/avatar.png',
  verifiedLabel: 'Project Manager and Full-Stack Developer',
  email: 'delimamarkjason0@gmail.com',
  location: 'Philippines',
  stats: [
    { value: '3 yrs', label: 'QA · Dev · PM', Icon: Briefcase },
    { value: '5', label: 'Projects', Icon: Stack },
    { value: 'GMT+8', label: 'Philippines', Icon: Clock },
  ],
  // The intro types this line, then flies it into the Home headline.
  // Keep it short: two halves, 5-8 words total.
  displayName: { line1: 'Build it. Test it.', line2: 'Ship it.' },
  hero: {
    body: 'Project Manager and Full-Stack Developer. I lead delivery of web apps built with React, Next.js, Laravel and NestJS, from user story through UAT to production.',
    portraitSrc: '/avatar.png',
    portraitAlt: 'Mark Jason Delima',
  },
  socials: [
    { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/markjasondelima', iconPath: '/icons/linkedin.svg' },
    { label: 'GitHub profile', href: 'https://github.com/MARTKJASON', iconPath: '/icons/ai/github.svg' },
  ],
}
