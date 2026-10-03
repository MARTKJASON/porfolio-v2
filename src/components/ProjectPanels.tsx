import { useEffect, useState, type ReactNode } from 'react'
import { lazy, Suspense } from 'react'
import AIStackGrid from './AIStackGrid'
import { useFunnelModal } from './FunnelModal'
import { caseStudies } from '@/data/funnels'
import { techStack, qaStack } from '@/data/ai-stack'

const FunnelBarrel = lazy(() => import('./FunnelBarrel'))

/**
 * What the Projects dialogs show. Each panel is the work itself, on screen
 * the moment the dialog opens - no section chrome to read past and no second
 * dialog to click into.
 */

/** A plain mac window with a scrolling body, for the sections that are
 *  pages rather than frames. */
function SectionWindow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ppanel ppanel--window">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ppanel__url">
          <span className="ppanel__url-host">{label}</span>
        </span>
      </div>
      <div className="ppanel__scroll">{children}</div>
    </div>
  )
}

/** Every case study on the barrel, spinning on the backdrop. Its own page
 *  preview still stacks above (z 9000). */
export function BarrelPanel() {
  const { openFull, modal } = useFunnelModal()
  return (
    <div className="ppanel ppanel--barrel">
      <Suspense fallback={<div className="funnels__barrel-skeleton" aria-hidden="true" />}>
        <FunnelBarrel funnels={caseStudies} onOpen={openFull} />
      </Suspense>
      {modal}
    </div>
  )
}

/** The development skills as a logo-first grid, in a scrolling window. */
export function TechWindow() {
  return (
    <SectionWindow label="Tech stack">
      <AIStackGrid root={techStack} eyebrow="Tech stack" />
    </SectionWindow>
  )
}

/** The QA skills, same grid. */
export function QAWindow() {
  return (
    <SectionWindow label="QA & Testing">
      <AIStackGrid root={qaStack} eyebrow="QA & Testing" />
    </SectionWindow>
  )
}

/** One case-study page, framed, open on arrival. `file` is a page in
 *  public/samples/; `path` is what the fake address bar shows. */
type Build = { label: string; file: string; path: string }

function BuildPanel({ build }: { build: Build }) {
  return (
    <div className="ppanel ppanel--frame">
      <FrameBar host="case study" path={build.path} />
      <LiveFrame src={`/samples/${build.file}`} title={build.label} />
    </div>
  )
}
export const FMSPanel = () => <BuildPanel build={{ label: 'FMS - Facility Management System', file: 'fms.html', path: '/fms' }} />
export const ExpensePanel = () => <BuildPanel build={{ label: 'Expense Management System', file: 'expense.html', path: '/expense-management' }} />
export const SpaceePanel = () => <BuildPanel build={{ label: 'Spacee', file: 'spacee.html', path: '/spacee' }} />
export const NFCPanel = () => <BuildPanel build={{ label: 'NFC Touchpoints', file: 'nfc.html', path: '/nfc-touchpoints' }} />
export const DanglingPanel = () => <BuildPanel build={{ label: 'Dangling Co', file: 'dangling-co.html', path: '/dangling-co' }} />

function FrameBar({ host, path }: { host: string; path: string }) {
  return (
    <div className="ppanel__bar">
      <span className="ppanel__dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="ppanel__url">
        <span className="ppanel__url-host">{host}</span>
        <span className="ppanel__url-path">{path}</span>
      </span>
    </div>
  )
}

/** Matches `pmodal-panel` (420ms). Same-site frames share the portfolio's
 *  main thread, so loading one mid-animation stalled the open by 100ms+. */
const FRAME_DELAY_MS = 440

function LiveFrame({ src, title }: { src: string; title: string }) {
  const [ready, setReady] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), FRAME_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [])
  return (
    <div className="ppanel__stage">
      {!ready && <div className="ppanel__skeleton" aria-hidden="true" />}
      {mounted && <iframe
        className="ppanel__iframe"
        src={src}
        title={title}
        loading="eager"
        onLoad={() => setReady(true)}
        data-ready={ready ? 'true' : 'false'}
      />}
    </div>
  )
}
