import { techStack, type StackNode, type StackLogo } from '@/data/ai-stack'

/**
 * A skill tree as a logo-first grid, for the Projects pop-ups.
 *
 * Each card leads with the marks of the tool (when it has them), then the
 * plain-English line, then where it was used. Names, copy and marks all come
 * from ai-stack.ts, so any tree in that file renders here unchanged.
 */

/** The everyday tools shown in the header. */
const HARNESS: StackLogo[] = [
  { name: 'VS Code', src: '/icons/vscode.svg' },
  { name: 'Cursor', src: '/icons/ai/cursor.svg' },
  { name: 'Claude', src: '/icons/ai/claude-color.svg' },
  { name: 'Codex', src: '/icons/ai/codex.svg' },
]

type Group = { title: string; what: string; systems: StackNode[] }

/** Flatten the tree into groups: a branch with children is a group, a leaf
 *  branch (one with a status) is a group of itself plus any children. */
function groups(root: StackNode): Group[] {
  return (root.children ?? []).map((branch) => ({
    title: branch.name,
    what: branch.what,
    systems: branch.status ? [branch, ...(branch.children ?? [])] : (branch.children ?? []),
  }))
}

function Card({ n }: { n: StackNode }) {
  const tools = n.logos ?? []
  return (
    <li className="aig__card">
      {(tools.length > 0 || n.status) && (
        <div className="aig__marks" aria-label={`Tools: ${tools.map((t) => t.name).join(', ')}`}>
          {tools.map((t) => (
            <span key={t.name} className="aig__mark" title={t.name}>
              <img src={t.src} alt="" width={22} height={22} loading="lazy" decoding="async" />
            </span>
          ))}
          {n.status && (
            <span className="aig__status" data-status={n.status}>
              {n.status}
            </span>
          )}
        </div>
      )}
      <h4 className="aig__name">
        <n.Icon size={16} weight="duotone" aria-hidden="true" />
        {n.name}
      </h4>
      <p className="aig__what">{n.what}</p>
      {n.stack && <p className="aig__stack">{n.stack}</p>}
    </li>
  )
}

export default function AIStackGrid({ root = techStack, eyebrow = 'Tech stack' }: { root?: StackNode; eyebrow?: string }) {
  return (
    <div className="aig">
      <header className="aig__head">
        <div className="aig__head-text">
          <span className="aig__eyebrow">{eyebrow}</span>
          <h3 className="aig__title">{root.what}</h3>
        </div>
        <div className="aig__harness" aria-label="Everyday tools">
          <span className="aig__harness-label">Daily tools</span>
          {HARNESS.map((t) => (
            <span key={t.name} className="aig__harness-item">
              <img src={t.src} alt="" width={20} height={20} />
              {t.name}
            </span>
          ))}
        </div>
      </header>

      {groups(root).map((g) => (
        <section key={g.title} className="aig__group" aria-label={g.title}>
          <div className="aig__group-head">
            <h3 className="aig__group-title">{g.title}</h3>
            <p className="aig__group-what">{g.what}</p>
          </div>
          <ul className="aig__cards" role="list">
            {g.systems.map((n) => (
              <Card key={n.id} n={n} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
