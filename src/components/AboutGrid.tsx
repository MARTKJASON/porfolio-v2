import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin, Briefcase, Diamond, TestTube, UsersThree, RocketLaunch, type Icon } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who I am on the left, the portrait on the
 * right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things I do - each carrying the marks
 * of the tools it uses. A mark is either a logo (`src`) or a glyph (`Icon`).
 */

type Mark = { name: string; src?: string; Icon?: Icon }

const REACT = { src: '/icons/ai/react.svg', name: 'React' }
const NEXT = { src: '/icons/ai/nextdotjs.svg', name: 'Next.js' }
const LARAVEL = { src: '/icons/ai/laravel.svg', name: 'Laravel' }
const NEST = { src: '/icons/ai/nestjs.svg', name: 'NestJS' }
const TS = { src: '/icons/ai/typescript.svg', name: 'TypeScript' }
const DOCKER = { src: '/icons/ai/docker.svg', name: 'Docker' }
const GIT = { src: '/icons/ai/git.svg', name: 'Git' }
const MYSQL = { src: '/icons/ai/mysql.svg', name: 'MySQL' }
const POSTGRES = { src: '/icons/ai/postgresql.svg', name: 'PostgreSQL' }
const CLAUDE = { src: '/icons/ai/claude-color.svg', name: 'Claude' }
const CODEX = { src: '/icons/ai/codex.svg', name: 'Codex' }
const CURSOR = { src: '/icons/ai/cursor.svg', name: 'Cursor' }
const VSCODE = { src: '/icons/vscode.svg', name: 'VS Code' }
const TESTING = { Icon: TestTube, name: 'Testing' }
const UAT = { Icon: UsersThree, name: 'UAT' }
const RELEASE = { Icon: RocketLaunch, name: 'Release' }

type Capability = {
  index: string
  title: string
  marks: Mark[]
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Full-stack development',
    marks: [REACT, NEXT, TS, LARAVEL, NEST],
  },
  {
    index: '02',
    title: 'Project management, UAT & release',
    marks: [TESTING, UAT, RELEASE],
  },
  {
    index: '03',
    title: 'Deployment & databases',
    marks: [DOCKER, GIT, MYSQL, POSTGRES],
  },
  {
    index: '04',
    title: 'AI-Driven Development (AIDD)',
    marks: [CLAUDE, CODEX, CURSOR, VSCODE],
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          Project Manager & Full-Stack Developer, based in the Philippines.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            I build software, test it, and help the team ship it.
            <span> I have worked at every stage, from user story to production.</span>
          </p>

          <p className="agrid__note">
            <strong>Software QA, then full-stack development, now Project Manager / Technical Lead.</strong>{' '}
            I currently manage an Expense Management System: I track user stories and priorities,
            coordinate developers, QA and stakeholders, review PRs, run UAT and plan releases. Outside work I run{' '}
            <a className="agrid__link" href="https://danglingco.vercel.app" target="_blank" rel="noopener noreferrer">
              Dangling Co
            </a>{' '}
            and I&rsquo;m building an NFC product for businesses.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                      title={m.name}
                    >
                      {m.Icon ? (
                        <m.Icon weight="duotone" aria-label={m.name} />
                      ) : (
                        <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                      )}
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <Briefcase size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">3 years experience</span>
                <span className="agrid__cell-meta">QA → Full-stack → PM / Tech Lead</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">GMT+8 · PHT</span>
              </span>
            </span>

            <a className="agrid__cell agrid__cell--wide" href="https://danglingco.vercel.app" target="_blank" rel="noopener noreferrer">
              <span className="agrid__cell-mark">
                <Diamond size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Dangling Co</span>
                <span className="agrid__cell-meta">Founder · danglingco.vercel.app</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.hero.portraitSrc}
            alt={profile.hero.portraitAlt}
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
