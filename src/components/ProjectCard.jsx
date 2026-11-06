import { useLanguage } from "../i18n/language"
import { ArrowUpRightIcon, ChartIcon, CheckIcon, CodeIcon } from "./Icons"
import PipelineDiagram from "./PipelineDiagram"

function HowItWorks({ steps, paragraphs }) {
  return (
    <>
      <PipelineDiagram steps={steps} />
      <div className="case-prose">
        {paragraphs.map((p) => (
          <p key={p.lead}>
            <strong>{p.lead}.</strong> {p.text}
          </p>
        ))}
      </div>
    </>
  )
}

// Un bloque puede ser texto, una lista, o { intro, items, outro }.
function RichText({ value }) {
  if (typeof value === "string") return value
  const { intro, items, outro } = Array.isArray(value) ? { items: value } : value
  return (
    <>
      {intro && <p>{intro}</p>}
      <ul className="achievements">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {outro && <p className="case-outro">{outro}</p>}
    </>
  )
}

export default function ProjectCard({ project }) {
  const { t } = useLanguage()
  const { ui } = t
  const { title, subtitle, context, problem, solution, howItWorks, result, tags, demo, code, tests, dashboard, internal } = project
  const hasLinks = demo || code || tests || dashboard
  const linkHint = `${ui.of} ${title} (${ui.newTab})`

  const blocks = [
    { label: ui.caseStudy.problem, content: problem },
    { label: ui.caseStudy.solution, content: <RichText value={solution} /> },
    howItWorks && { label: ui.caseStudy.howItWorks, content: <HowItWorks {...howItWorks} /> },
    { label: ui.caseStudy.result, content: <RichText value={result} /> },
  ].filter(Boolean)

  return (
    <article className="project-card card">
      <p className="project-context">{context}</p>
      <h3>{title}</h3>
      {subtitle && <p className="project-subtitle">{subtitle}</p>}

      <dl className="case-study">
        {blocks.map((block) => (
          <div key={block.label}>
            <dt>{block.label}</dt>
            <dd>{block.content}</dd>
          </div>
        ))}
      </dl>

      <ul className="tag-list" aria-label={ui.technologies}>
        {tags.map((tag) => (
          <li key={tag} className="tag tag-sm">{tag}</li>
        ))}
      </ul>

      <div className="project-links">
        {hasLinks ? (
          <>
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className="text-link">
                {ui.demo} <ArrowUpRightIcon />
                <span className="sr-only">{linkHint}</span>
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noopener noreferrer" className="text-link">
                {ui.code} <CodeIcon />
                <span className="sr-only">{linkHint}</span>
              </a>
            )}
            {tests && (
              <a href={tests} target="_blank" rel="noopener noreferrer" className="text-link">
                {ui.tests} <CheckIcon />
                <span className="sr-only">{linkHint}</span>
              </a>
            )}
            {dashboard && (
              <a href={dashboard} className="text-link">
                {ui.dashboard} <ChartIcon />
              </a>
            )}
          </>
        ) : (
          <span className="project-private">
            {internal ? ui.internalProject : ui.noPublicLinks}
          </span>
        )}
      </div>
    </article>
  )
}
