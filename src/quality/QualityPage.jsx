// Panel de calidad (/calidad): muestra la última corrida del CI publicada en calidad.json.

import { ArrowUpRightIcon } from "../components/Icons"
import { quality } from "../data/profile"
import { useLanguage } from "../i18n/language"
import { formatDate, formatDuration, formatRelative } from "./format"
import LighthousePanel from "./LighthousePanel"
import PipelineTimeline from "./PipelineTimeline"
import QualitySkeleton from "./QualitySkeleton"
import RunHistory from "./RunHistory"
import StatusBadge from "./StatusBadge"
import TestResults from "./TestResults"
import { useQualityData } from "./useQualityData"

function ExternalLink({ href, children }) {
  const { t } = useLanguage()
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-link">
      {children} <ArrowUpRightIcon />
      <span className="sr-only">({t.ui.newTab})</span>
    </a>
  )
}

// Línea al estilo de la salida de Playwright en la terminal.
function TerminalSummary({ resumen, lang }) {
  const parts = [`${resumen.pasaron} passed`]
  if (resumen.fallaron) parts.push(`${resumen.fallaron} failed`)
  if (resumen.flaky) parts.push(`${resumen.flaky} flaky`)
  if (resumen.omitidas) parts.push(`${resumen.omitidas} skipped`)

  return (
    <pre className="terminal" aria-hidden="true">
      <span className="terminal-prompt">$ </span>npx playwright test{"\n"}
      <span className={resumen.fallaron ? "terminal-fail" : "terminal-ok"}>{parts.join(", ")}</span>
      <span className="terminal-muted"> ({formatDuration(resumen.duracionMs, lang)})</span>
    </pre>
  )
}

function RunBanner({ data }) {
  const { t, lang } = useLanguage()
  const q = t.quality
  const { run, reportes } = data

  return (
    <section className="run-banner card" aria-label={q.status[data.estado]}>
      <div className="run-banner-main">
        <StatusBadge status={data.estado} label={q.status[data.estado]} large />
        <dl className="run-meta">
          {run ? (
            <>
              <div>
                <dt>{q.run}</dt>
                <dd>#{run.numero}</dd>
              </div>
              <div>
                <dt>{q.commit}</dt>
                <dd>
                  <a href={run.commitUrl} target="_blank" rel="noopener noreferrer" className="mono-link">
                    {run.commit}
                    <span className="sr-only"> ({t.ui.newTab})</span>
                  </a>
                  {run.mensaje && <span className="run-message"> {run.mensaje}</span>}
                </dd>
              </div>
              {run.rama && (
                <div>
                  <dt>{q.branch}</dt>
                  <dd>{run.rama}</dd>
                </div>
              )}
            </>
          ) : (
            <div>
              <dt>{q.run}</dt>
              <dd>{q.localRun}</dd>
            </div>
          )}
          <div>
            <dt>{q.generated}</dt>
            <dd>
              <time dateTime={data.generado} title={formatDate(data.generado, lang)}>
                {formatRelative(data.generado, lang)}
              </time>
            </dd>
          </div>
        </dl>
      </div>

      {data.resumen && <TerminalSummary resumen={data.resumen} lang={lang} />}

      <div className="run-links">
        {run && <ExternalLink href={run.url}>{q.links.run}</ExternalLink>}
        {reportes?.e2e && <ExternalLink href={reportes.e2e}>{q.links.e2e}</ExternalLink>}
        {reportes?.lighthouse && data.lighthouse && <ExternalLink href={reportes.lighthouse}>{q.links.lighthouse}</ExternalLink>}
      </div>
    </section>
  )
}

function Kpis({ data }) {
  const { t, lang } = useLanguage()
  const k = t.quality.kpis
  const r = data.resumen
  if (!r) return null

  const tiles = [
    { label: k.tests, value: `${r.pasaron}/${r.total}`, hint: k.passedOf(r.pasaron, r.total) },
    { label: k.failed, value: r.fallaron, hint: k.failedHint, tone: r.fallaron ? "is-fail" : "" },
    { label: k.flaky, value: r.flaky, hint: k.flakyHint, tone: r.flaky ? "is-flaky" : "" },
    { label: k.duration, value: formatDuration(r.duracionMs, lang), hint: k.durationHint(data.proyectos.length) },
  ]

  return (
    <section aria-label={k.label}>
      <dl className="kpis">
        {tiles.map((tile) => (
          <div key={tile.label} className={`kpi card ${tile.tone ?? ""}`}>
            <dt>{tile.label}</dt>
            <dd className="kpi-value">{tile.value}</dd>
            <dd className="kpi-hint">{tile.hint}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default function QualityPage() {
  const { t } = useLanguage()
  const q = t.quality
  const { status, data, retry } = useQualityData(quality.dataUrl)

  return (
    <div className="quality">
      <header className="quality-header">
        <a href="/" className="text-link quality-back">
          <span aria-hidden="true">←</span> {q.back}
        </a>
        <p className="quality-eyebrow">{q.eyebrow}</p>
        <h1>{q.title}</h1>
        <p className="section-lead">{q.lead}</p>
      </header>

      {status === "loading" && <QualitySkeleton />}

      {status === "error" && (
        <div className="quality-error card" role="alert">
          <p className="quality-error-title">{q.error}</p>
          <p>{q.errorHint}</p>
          <div className="quality-error-actions">
            <button type="button" className="btn btn-secondary" onClick={retry}>
              {q.retry}
            </button>
            <ExternalLink href={quality.actionsUrl}>{q.actionsLink}</ExternalLink>
          </div>
        </div>
      )}

      {status === "ready" && (
        <>
          <RunBanner data={data} />
          <Kpis data={data} />
          <div className="quality-grid">
            <LighthousePanel lighthouse={data.lighthouse} />
            <PipelineTimeline pipeline={data.pipeline} />
          </div>
          {data.archivos.length > 0 && <TestResults key={data.generado} data={data} />}
          <RunHistory historial={data.historial} />
        </>
      )}
    </div>
  )
}
