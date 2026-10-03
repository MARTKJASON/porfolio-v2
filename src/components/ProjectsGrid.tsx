import { Fragment, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, Buildings, ContactlessPayment, Diamond, CursorClick, HandPointing, TestTube, Repeat, UsersThree, RocketLaunch } from '@/components/slab'
import { FlowIcon, PlanIcon, GlobeIcon, SparkIcon, DeviceIcon } from './ProjectIcons'
import { FMSPanel, ExpensePanel, SpaceePanel, NFCPanel, DanglingPanel, BarrelPanel, TechWindow, QAWindow } from './ProjectPanels'
import { caseStudies, caseStudy, type Funnel } from '@/data/funnels'
import { techStack, leaves } from '@/data/ai-stack'
import { useIsPhone } from '@/hooks/useMediaQuery'

/**
 * Projects, as one viewport in Home's bento language: a glass panel of
 * cards, each previewing its own body of work with a live inner track, each
 * opening the work itself in a near-fullscreen dialog (the case-study pages
 * in public/samples/, the 3D carousel of all of them, and the skill grids).
 *
 * The dialog is a portal at z 8000, under the funnel preview (9000) so the
 * barrel's own "open this page" dialog can still stack on top of it.
 */
type Project = {
  id: string
  index: string
  title: string
  desc: string
  Icon: ComponentType<{ size?: number }>
  eyebrow: string
  Section: ComponentType
  span?: 2
  /** Small kicker above the title on the build cards. */
  kicker?: string
  /** Real marks of what the work was built in; replaces the icon tile. */
  logos?: string[]
  Preview: ComponentType
  /** Phone filter bucket. */
  cat: Cat
}

type Cat = 'work' | 'ventures' | 'skills'
const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Work' },
  { key: 'ventures', label: 'Ventures' },
  { key: 'skills', label: 'Skills' },
]

/** Tool marks, from public/icons. */
const NEST = '/icons/ai/nestjs.svg'
const REACT = '/icons/ai/react.svg'
const NEXT = '/icons/ai/nextdotjs.svg'

const thumbSrc = (f: Funnel) => `/${f.dir ?? 'funnels'}/thumbs/${f.file.replace('.html', '.jpeg')}`

/** FMS leads the reel; the rest of the case studies follow it. */
const REEL_SHOTS = [caseStudy('fms.html'), ...caseStudies.filter((c) => c.file !== 'fms.html')].map(thumbSrc)
const FAN_SHOTS = [caseStudy('spacee.html'), caseStudy('nfc.html'), caseStudy('dangling-co.html')]

/** The three smaller builds: each its own card in the stack, each its own
 *  pop-up. */
const BUILDS: Project[] = [
  { id: 'spacee', cat: 'work', index: '03', kicker: 'Backend · NestJS', title: 'Spacee', desc: 'A platform for renting rooms and office spaces in Japan. I built the API and the database-driven features.', Icon: () => <Buildings size={20} weight="duotone" />, logos: [NEST], eyebrow: 'Work project', Section: SpaceePanel, Preview: () => null },
  { id: 'nfc', cat: 'ventures', index: '04', kicker: 'Personal venture', title: 'NFC Touchpoints', desc: 'NFC cards for businesses, with a URL for each touchpoint that leads to reviews, social pages and leads.', Icon: () => <ContactlessPayment size={20} weight="duotone" />, eyebrow: 'Personal venture', Section: NFCPanel, Preview: () => null },
  { id: 'dangling', cat: 'ventures', index: '05', kicker: 'Personal venture', title: 'Dangling Co', desc: 'A handmade accessories business. I run the website and the operations behind it.', Icon: () => <Diamond size={20} weight="duotone" />, eyebrow: 'Personal venture', Section: DanglingPanel, Preview: () => null },
]

const TECH_LEAVES = leaves(techStack)

/** The QA work, five lines on the wide card. */
const QA_LINES = [
  { Icon: HandPointing, title: 'Manual & exploratory', note: 'Features tested the way users use them' },
  { Icon: TestTube, title: 'Automation testing', note: 'Checks that run on every change' },
  { Icon: Repeat, title: 'Regression testing', note: 'New work does not break old work' },
  { Icon: UsersThree, title: 'UAT facilitation', note: 'Real users sign off before release' },
  { Icon: RocketLaunch, title: 'Production readiness', note: 'Staging validation and go or no-go' },
] as const

/* ---------- Previews ---------- */

function ReelPreview() {
  return (
    <div className="bento__media bento__reel" aria-hidden="true">
      <div className="bento__reel-track">
        {[...REEL_SHOTS, ...REEL_SHOTS].map((src, i) => (
          <span key={i} className="bento__shot">
            <img src={src} alt="" loading="lazy" decoding="async" />
          </span>
        ))}
      </div>
    </div>
  )
}

/** A paper mock of the UAT document. */
function UATPreview() {
  return (
    <div className="bento__media bento__doc" aria-hidden="true">
      <span className="bento__doc-eyebrow">UAT plan</span>
      <span className="bento__doc-title">Expense Management System</span>
      <span className="bento__doc-flow">
        <i>Dev</i>
        <i>QA</i>
        <i>UAT</i>
        <i className="is-on">Prod</i>
      </span>
      <span className="bento__doc-line" />
      <span className="bento__doc-line bento__doc-line--short" />
    </div>
  )
}

function FanPreview() {
  return (
    <div className="bento__media bento__fan" aria-hidden="true">
      {FAN_SHOTS.map((f, i) => (
        <span key={f.file} className="bento__photo bento__photo--page" style={{ ['--i' as string]: i }}>
          <img src={thumbSrc(f)} alt="" loading="lazy" decoding="async" />
        </span>
      ))}
    </div>
  )
}

function TechPreview() {
  const half = Math.ceil(TECH_LEAVES.length / 2)
  const rows = [TECH_LEAVES.slice(0, half), TECH_LEAVES.slice(half)]
  return (
    <div className="bento__media bento__chips" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
          <div className="bento__chip-track">
            {[...row, ...row].map((n, i) => (
              <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                <n.Icon size={15} weight="duotone" />
                {n.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function QAPreview() {
  return (
    <ul className="bento__media bento__offers" role="list" aria-hidden="true">
      {QA_LINES.map(({ Icon, title, note }, i) => (
        <li key={title} className="bento__offer" style={{ ['--i' as string]: i }}>
          <span className="bento__offer-tile">
            <Icon size={15} weight="duotone" />
          </span>
          <span className="bento__offer-text">
            <span className="bento__offer-title">{title}</span>
            <span className="bento__offer-note">{note}</span>
          </span>
          <span className="bento__offer-num">0{i + 1}</span>
        </li>
      ))}
    </ul>
  )
}

const PROJECTS: Project[] = [
  { id: 'workflows', cat: 'work', index: '01', title: 'FMS - Facility Management System', desc: 'Equipment and requests with role-based access and two-level approval. I worked on it as developer, QA and release coordinator, and it is now in production.', Icon: FlowIcon, eyebrow: 'Work project', Section: FMSPanel, span: 2, Preview: ReelPreview },
  { id: 'plan', cat: 'work', index: '02', title: 'Expense Management System', desc: 'I am Project Manager: I coordinate developers, QA and stakeholders from development through UAT to production release.', Icon: PlanIcon, eyebrow: 'Work project', Section: ExpensePanel, Preview: UATPreview },
  { id: 'funnels', cat: 'work', index: '06', title: 'All case studies', desc: 'Every project on one carousel. Spin it and open any page.', Icon: GlobeIcon, eyebrow: 'Case studies', Section: BarrelPanel, Preview: FanPreview },
  { id: 'ai', cat: 'skills', index: '07', title: 'Tech stack', desc: 'React, Next.js, Laravel, NestJS, MySQL, PostgreSQL, Docker and AI-assisted development.', Icon: SparkIcon, logos: [REACT, NEXT, NEST], eyebrow: 'Skills', Section: TechWindow, Preview: TechPreview },
  { id: 'apps', cat: 'skills', index: '08', title: 'QA & Testing', desc: 'A year of QA work: manual, automation and regression testing, UAT, and staging and production validation.', Icon: DeviceIcon, eyebrow: 'Skills', Section: QAWindow, span: 2, Preview: QAPreview },
]

/** The icon tile, or the real marks stacked horizontally in its place. */
function Marks({ p, size = 22 }: { p: Project; size?: number }) {
  if (!p.logos?.length) {
    return (
      <span className="bento__icon">
        <p.Icon size={size} />
      </span>
    )
  }
  return (
    <span className="bento__logos" aria-hidden="true">
      {p.logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- Dialog ----------
   A backdrop, a close button in the corner, and the work. No panel, no
   header: each Section brings its own window (or, for the strip, none). */
function ProjectModal({ project, onClose, children }: { project: Project; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body,
  )
}

/* ---------- The page ---------- */

export default function ProjectsGrid() {
  const [open, setOpen] = useState<Project | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<Cat | 'all'>('all')
  const keep = (p: Project) => !phone || cat === 'all' || p.cat === cat
  const projects = PROJECTS.filter(keep)
  const builds = BUILDS.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: Project, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const stack = builds.length > 0 ? (
    <div className="bento__stack">

        {builds.map((b) => (

          <button

            key={b.id}

            type="button"

            className="bento__card bento__card--btn bento__card--build"

            onClick={(e) => show(b, e.currentTarget)}

            aria-haspopup="dialog"

          >

            <span className="bento__build-plate">

              {b.logos?.length ? <img src={b.logos[0]} alt="" width={22} height={22} /> : <b.Icon />}

            </span>

            <span className="bento__build-text">

              <span className="bento__kicker">{b.kicker}</span>

              <span className="bento__build-title">{b.title}</span>

              <span className="bento__build-desc">{b.desc}</span>

            </span>

            <span className="bento__build-arrow">

              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />

            </span>

          </button>

        ))}

      </div>
  ) : null

  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">
          What I’ve built, tested and shipped.
        </h1>
        <p className="pgrid__lede">Work projects I built, tested and released, plus the ventures I run myself. Open a card to see the full case study.</p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass">
        {/* Hung on the sheet's top edge so it reads as a tag on the container,
            not a seventh card. aria-hidden: the lede already says it. */}
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Click a card to open it
        </span>
        <div className="bento bento--projects">
          {projects.map((p) => (
            <Fragment key={p.id}>
            <button
              type="button"
              className={`bento__card bento__card--btn${p.span === 2 ? ' bento__card--wide' : ''}`}
              data-id={p.id}
              onClick={(e) => show(p, e.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className="bento__head">
                <Marks p={p} />
                <span className="bento__title">{p.title}</span>
                <span className="bento__desc">{p.desc}</span>
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
              </span>
              <p.Preview />
            </button>
            {p.id === 'plan' && stack}
            </Fragment>
          ))}
          {!projects.some((p) => p.id === 'plan') && stack}
        </div>
      </div>

      {open && (
        <ProjectModal project={open} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
