/**
 * The skill trees shown on the Projects page ("Tech stack" and "QA &
 * Testing" pop-ups) and as chips on Home and in the Projects bento cards.
 *
 * This file is the ONLY place node copy lives. AIStack.tsx and AIStackGrid.tsx
 * render whatever shape they find here, so changing content is a data edit
 * and never a JSX edit. Keep the exported names and types stable.
 *
 * Shape rules:
 * - The root is you. Its children are the categories (branches).
 * - A branch with `status` is itself an item; a branch without one is a
 *   group whose children are the items.
 * - `logos` are the marks shown on each card (files in public/icons).
 */

import {
  Sparkle,
  Atom,
  FileTs,
  FileJs,
  Browser,
  Database,
  Cube,
  GitBranch,
  ArrowsClockwise,
  Code,
  DeviceMobile,
  Robot,
  HardDrives,
  Hexagon,
  Lightning,
  TestTube,
  HandPointing,
  Repeat,
  CloudCheck,
  UsersThree,
  RocketLaunch,
  GitPullRequest,
  Bug,
  MagnifyingGlass,
  ShieldCheck,
  Kanban,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'

/** A vendor mark shown on a card. */
export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  /** One plain sentence a non-technical reader understands. */
  what: string
  /** Where it was used. Rendered small and muted. */
  stack?: string
  status?: StackStatus
  /** Phosphor glyph for the card's mark tile. Every node has one. */
  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

const L = {
  react: { src: '/icons/ai/react.svg', name: 'React' },
  next: { src: '/icons/ai/nextdotjs.svg', name: 'Next.js' },
  ts: { src: '/icons/ai/typescript.svg', name: 'TypeScript' },
  js: { src: '/icons/ai/javascript.svg', name: 'JavaScript' },
  laravel: { src: '/icons/ai/laravel.svg', name: 'Laravel' },
  nest: { src: '/icons/ai/nestjs.svg', name: 'NestJS' },
  node: { src: '/icons/ai/nodedotjs.svg', name: 'Node.js' },
  mysql: { src: '/icons/ai/mysql.svg', name: 'MySQL' },
  postgres: { src: '/icons/ai/postgresql.svg', name: 'PostgreSQL' },
  docker: { src: '/icons/ai/docker.svg', name: 'Docker' },
  git: { src: '/icons/ai/git.svg', name: 'Git' },
  github: { src: '/icons/ai/github.svg', name: 'GitHub' },
  vscode: { src: '/icons/vscode.svg', name: 'VS Code' },
  cursor: { src: '/icons/ai/cursor.svg', name: 'Cursor' },
  android: { src: '/icons/ai/androidstudio.svg', name: 'Android Studio' },
  claude: { src: '/icons/ai/claude-color.svg', name: 'Claude' },
  codex: { src: '/icons/ai/codex.svg', name: 'Codex' },
} satisfies Record<string, StackLogo>

/** Development skills. */
export const techStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'The stack I build, test and ship with.',
  stack: 'Full-stack web development',
  children: [
    {
      id: 'frontend',
      Icon: Browser,
      name: 'Frontend',
      what: 'The interfaces people use every day.',
      children: [
        { id: 'react', Icon: Atom, logos: [L.react], name: 'React.js', what: 'Component-based interfaces for web apps.' },
        { id: 'next', Icon: Browser, logos: [L.next], name: 'Next.js', what: 'React with routing and server rendering built in.' },
        { id: 'ts', Icon: FileTs, logos: [L.ts], name: 'TypeScript', what: 'Typed JavaScript on both the frontend and the backend.' },
        { id: 'js', Icon: FileJs, logos: [L.js], name: 'JavaScript', what: 'The language of the web, end to end.' },
      ],
    },
    {
      id: 'backend',
      Icon: HardDrives,
      name: 'Backend',
      what: 'APIs and the business logic behind them.',
      children: [
        { id: 'laravel', Icon: Hexagon, logos: [L.laravel], name: 'Laravel', what: 'PHP framework for full-featured web apps and APIs.' },
        { id: 'nest', Icon: Lightning, logos: [L.nest], name: 'NestJS', what: 'Structured Node.js backends and REST APIs.', stack: 'Used on Spacee' },
        { id: 'node', Icon: Code, logos: [L.node], name: 'Node.js', what: 'The JavaScript runtime behind my backend work.' },
      ],
    },
    {
      id: 'database',
      Icon: Database,
      name: 'Database',
      what: 'Relational data, modelled and queried.',
      children: [
        { id: 'mysql', Icon: Database, logos: [L.mysql], name: 'MySQL', what: 'Relational database for web applications.' },
        { id: 'postgres', Icon: Database, logos: [L.postgres], name: 'PostgreSQL', what: 'Relational database with advanced querying.' },
      ],
    },
    {
      id: 'devops',
      Icon: Cube,
      name: 'DevOps & tools',
      what: 'From pull request to a running container.',
      children: [
        { id: 'docker', Icon: Cube, logos: [L.docker], name: 'Docker', what: 'Container builds, rebuilds and restarts for staging and production.' },
        { id: 'git', Icon: GitBranch, logos: [L.git, L.github], name: 'Git workflows', what: 'Branches, pull requests, reviews and merges.' },
        { id: 'cicd', Icon: ArrowsClockwise, logos: [L.github, L.docker], name: 'CI/CD', what: 'Automated tests, builds and staging deployments on merge.' },
        { id: 'editors', Icon: Code, logos: [L.vscode, L.cursor], name: 'VS Code & Cursor', what: 'Where the day-to-day coding happens.' },
        { id: 'android', Icon: DeviceMobile, logos: [L.android], name: 'Android Studio', what: 'For Android builds and testing on devices.' },
      ],
    },
    {
      id: 'ai',
      Icon: Robot,
      name: 'AI-assisted development',
      what: 'A year of AI-assisted development (AIDD): AI writes a draft, then I review, test and validate it.',
      children: [
        { id: 'claude', Icon: Robot, logos: [L.claude], name: 'Claude', what: 'AI-assisted implementation, checked with code review.' },
        { id: 'codex', Icon: Robot, logos: [L.codex], name: 'Codex', what: 'AI-assisted implementation, checked with testing.' },
      ],
    },
  ],
}

/** QA and delivery skills. */
export const qaStack: StackNode = {
  id: 'qa-root',
  Icon: ShieldCheck,
  name: profile.name,
  what: 'How I make sure what ships actually works.',
  stack: 'Software QA',
  children: [
    {
      id: 'testing',
      Icon: TestTube,
      name: 'Testing',
      what: 'Finding problems before users do.',
      children: [
        { id: 'manual', Icon: HandPointing, name: 'Manual testing', what: 'Working through features by hand, the way a user would.' },
        { id: 'automation', Icon: TestTube, name: 'Automation testing', what: 'Automated checks that run on every change.' },
        { id: 'regression', Icon: Repeat, name: 'Regression testing', what: 'Making sure new work does not break what already worked.' },
      ],
    },
    {
      id: 'release',
      Icon: RocketLaunch,
      name: 'Release validation',
      what: 'The checks between merged code and a release.',
      children: [
        { id: 'staging', Icon: CloudCheck, name: 'Staging validation', what: 'Testing each deployment on staging before it goes anywhere else.' },
        { id: 'uat', Icon: UsersThree, name: 'UAT facilitation', what: 'Running User Acceptance Testing with real users. I run UAT as Project Manager on the Expense Management System.' },
        { id: 'prod', Icon: RocketLaunch, name: 'Production readiness', what: 'Go or no-go checks before each production release.' },
      ],
    },
    {
      id: 'review',
      Icon: MagnifyingGlass,
      name: 'Review & coordination',
      what: 'Quality as part of the team process.',
      children: [
        { id: 'pr', Icon: GitPullRequest, name: 'PR & code review', what: 'Reviewing pull requests before they merge.' },
        { id: 'bugs', Icon: Bug, name: 'Bug validation', what: 'Reproducing, reporting and verifying fixes.' },
        { id: 'ai-review', Icon: Robot, name: 'Testing AI-generated code', what: 'Validating implementations written by developers or by AI.' },
        { id: 'coord', Icon: Kanban, name: 'Team coordination', what: 'Assigning user stories, following up on staging issues and planning releases.' },
      ],
    },
  ],
}

/** @deprecated kept for the legacy tree view - use techStack. */
export const aiStack = techStack

/** Every leaf of a tree, in order. */
export const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]

