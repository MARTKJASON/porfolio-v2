import type { CSSProperties } from 'react'
import { Code, TestTube, RocketLaunch, CheckCircle, UsersThree, Kanban } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot, { TOOLS } from '@/components/Autopilot'

/**
 * ServicesGrid - the Expertise view on one glass sheet.
 *
 * Three bands, top to bottom: the build / test / ship method (on a dark
 * plate so it is the first thing the eye lands on), the five things I bring
 * to a team as cards that carry the marks of what each one uses, and the
 * delivery pipeline demo scaled into whatever height is left.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Build',
    body: 'Features built from user stories in React, Next.js, Laravel or NestJS. AI helps write the code and every change gets reviewed.',
    Icon: Code,
    chips: ['React', 'Laravel', 'NestJS', 'AI-assisted'],
  },
  {
    index: '02',
    label: 'Test',
    body: 'Manual, automation and regression testing on staging, with PR review before anything merges.',
    Icon: TestTube,
    chips: ['Manual', 'Automation', 'Regression'],
  },
  {
    index: '03',
    label: 'Ship',
    body: 'UAT with real users and a production-readiness check, then a Docker-based release.',
    Icon: RocketLaunch,
    chips: ['UAT', 'CI/CD', 'Docker'],
  },
]

/* ---------- What I do ---------- */

const REACT = '/icons/ai/react.svg'
const LARAVEL = '/icons/ai/laravel.svg'
const NEST = '/icons/ai/nestjs.svg'
const DOCKER = '/icons/ai/docker.svg'
const GIT = '/icons/ai/git.svg'
const GITHUB = '/icons/ai/github.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  /** Tool marks; when empty, `Icon` is shown on a plate instead. */
  logos: string[]
  Icon?: Icon
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Full-Stack Development',
    description: 'Web apps from the interface down to the database.',
    chip: 'React · Laravel · NestJS',
    logos: [REACT, LARAVEL, NEST],
    bullets: ['React & Next.js interfaces', 'Laravel & NestJS APIs', 'MySQL & PostgreSQL data'],
  },
  {
    index: '02',
    title: 'QA & Testing',
    description: 'Catching problems before users do.',
    chip: 'Manual · Automation',
    logos: [],
    Icon: TestTube,
    bullets: ['Manual & automation testing', 'Regression on every release', 'Bug identification & validation'],
  },
  {
    index: '03',
    title: 'UAT Facilitation',
    description: 'Getting real users to sign off before release.',
    chip: 'User Acceptance Testing',
    logos: [],
    Icon: UsersThree,
    bullets: ['UAT process & documentation', 'Tester facilitation & issue tracking', 'Go or no-go for production'],
  },
  {
    index: '04',
    title: 'Deployment & DevOps',
    description: 'From a merged PR to a running release.',
    chip: 'Docker · CI/CD',
    logos: [DOCKER, GIT, GITHUB],
    bullets: ['CI/CD & staging deployments', 'Database migrations', 'Container rebuilds & troubleshooting'],
  },
  {
    index: '05',
    title: 'Project Coordination',
    description: 'Keeping a team on track to release.',
    chip: 'PM · Release planning',
    logos: [],
    Icon: Kanban,
    bullets: ['User story & task assignment', 'PR review & staging follow-up', 'Release & phase planning'],
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos, Icon: Glyph }: { logos: string[]; Icon?: Icon }) {
  if (!logos.length && Glyph) {
    return (
      <span className="bento__icon" aria-hidden="true">
        <Glyph size={20} weight="duotone" />
      </span>
    )
  }
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Expertise</span>
        <h1 className="pgrid__title" id="services-title">
          Developer, tester and coordinator.
        </h1>
        <p className="pgrid__lede">
          I work across the whole delivery cycle: building features, testing them, getting them through UAT and releasing them to production.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">How I work</span>
            <h2 className="sgrid__method-title" id="method-title">
              Build. Test. Ship.
              <br />
              <span>The whole cycle, not one stage.</span>
            </h2>
            <p className="sgrid__method-sub">
              I have been the developer, the tester and the coordinator, so I know what each stage needs from the one before it.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">What I bring to a team.</h2>
            <p className="sgrid__offers-sub">Hiring, or need help on a project? Get in touch.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} Icon={s.Icon} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* The live workflow. Its caption and the tool chips sit in a header
            above the window, so the canvas gets the whole glass width. */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Delivery pipeline</span>
              <h2 className="sgrid__flow-title">From pull request to production.</h2>
              <p className="sgrid__flow-sub">
                The release flow I work in every day: CI/CD, Docker, staging, QA, UAT and production.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools in this pipeline">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}
