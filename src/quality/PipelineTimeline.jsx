import { useLanguage } from "../i18n/language"
import { formatSeconds } from "./format"
import StatusBadge from "./StatusBadge"

// Línea de tiempo de los jobs de GitHub Actions: cada barra empieza cuando arrancó el job.
export default function PipelineTimeline({ pipeline }) {
  const { t, lang } = useLanguage()
  const p = t.quality.pipeline
  const states = t.quality.tests.states

  return (
    <section className="quality-section card" aria-labelledby="q-pipeline">
      <h2 id="q-pipeline">{p.title}</h2>
      <p className="quality-section-lead">{p.lead}</p>

      {pipeline ? (
        <>
          <ol className="timeline-jobs">
            {pipeline.jobs.map((job) => {
              const total = pipeline.duracionS || 1
              return (
                <li key={job.nombre} className="tl-job">
                  <div className="tl-head">
                    <StatusBadge status={job.estado} label={<span className="sr-only">{states[job.estado]}</span>} />
                    <span className="tl-name">{job.nombre}</span>
                    <span className="tl-duration">{formatSeconds(job.duracionS, lang)}</span>
                  </div>
                  <div className="tl-track" aria-hidden="true">
                    <span
                      className={`tl-bar ${job.estado === "fallo" ? "is-fail" : ""}`}
                      style={{ left: `${(job.inicioS / total) * 100}%`, width: `${Math.max((job.duracionS / total) * 100, 1)}%` }}
                    />
                  </div>
                  {job.inicioS > 0 && <p className="sr-only">{p.startsAt(formatSeconds(job.inicioS, lang))}</p>}
                  {job.pasos.length > 0 && (
                    <details className="tl-steps">
                      <summary>{p.steps(job.pasos.length)}</summary>
                      <ol>
                        {job.pasos.map((paso, i) => (
                          <li key={`${paso.nombre}-${i}`}>
                            <StatusBadge status={paso.estado} label={<span className="sr-only">{states[paso.estado]}</span>} />
                            <span className="tl-step-name">{paso.nombre}</span>
                            <span className="tl-duration">{formatSeconds(paso.duracionS, lang)}</span>
                          </li>
                        ))}
                      </ol>
                    </details>
                  )}
                </li>
              )
            })}
          </ol>
          <p className="tl-total">
            {p.total}: <strong>{formatSeconds(pipeline.duracionS, lang)}</strong>
          </p>
        </>
      ) : (
        <p className="quality-empty">{p.empty}</p>
      )}
    </section>
  )
}
