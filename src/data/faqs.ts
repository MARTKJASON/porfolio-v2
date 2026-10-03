export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I am a Project Manager with a full-stack and QA background. I currently manage an Expense Management System, coordinating developers, QA and stakeholders from development through UAT and production release.',
  },
  {
    q: 'What can you help with?',
    a: 'Project management and delivery, full-stack development, QA and UAT, deployment with Docker and CI/CD, and AI-Driven Development (AIDD) with Claude and Codex.',
  },
  {
    q: 'What is your experience?',
    a: 'I started in software QA, moved into full-stack development, and now work as a Project Manager / Technical Lead. My work includes FMS (now in production), the Expense Management System I currently manage, and the NestJS backend for Spacee.',
  },
  {
    q: 'Where are you based?',
    a: 'I am in the Philippines, on GMT+8.',
  },
  {
    q: 'What happens after I write?',
    a: 'Your message goes to my email and I will reply as soon as I can. Mention the role or project and a bit of context so I can give you a useful answer.',
  },
]
