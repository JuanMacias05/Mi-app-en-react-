import { quality } from "../data/profile"
import { useLanguage } from "../i18n/language"
import { formatDate, formatDuration } from "./format"
import StatusBadge from "./StatusBadge"

const SHORT_DATE = { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }

// Barras de duración por corrida. Cada barra enlaza a su run y muestra el detalle al pasar el cursor o enfocarla.
export default function RunHistory({ historial }) {
  const { t, lang } = useLanguage()
  const h = t.quality.history
  if (!historial?.length) return null

  const max = Math.max(...historial.map((e) => e.duracionMs), 1)
  const describe = (e) =>
    [
      e.numero ? `#${e.numero}` : null,
      formatDate(e.fecha, lang, SHORT_DATE),
      h.states[e.estado],
      `${e.pasaron}/${e.total}`,
      e.flaky ? `${e.flaky} flaky` : null,
      formatDuration(e.duracionMs, lang),
    ]
      .filter(Boolean)
      .join(" · ")

  return (
    <section className="quality-section card" aria-labelledby="q-history">
      <h2 id="q-history">{h.title}</h2>
      <p className="quality-section-lead">{historial.length > 1 ? h.lead(historial.length) : h.single}</p>

      <div className="history-chart">
        <span className="history-max" aria-hidden="true">
          {formatDuration(max, lang)}
        </span>
        <ol className="history-bars" aria-label={h.chartLabel}>
          {historial.map((e) => {
            const label = describe(e)
            const bar = (
              <>
                <span className={`history-bar is-${e.estado}`} style={{ height: `${Math.max((e.duracionMs / max) * 100, 3)}%` }} />
                {e.estado === "fallo" && (
                  <span className="history-mark" aria-hidden="true">
                    ✕
                  </span>
                )}
                <span className="history-tip" aria-hidden="true">
                  {label}
                </span>
              </>
            )
            return (
              <li key={e.run ?? e.fecha}>
                {e.run ? (
                  <a href={`${quality.repoUrl}/actions/runs/${e.run}`} target="_blank" rel="noopener noreferrer" aria-label={`${label} (${t.ui.newTab})`}>
                    {bar}
                  </a>
                ) : (
                  <span role="img" aria-label={label}>
                    {bar}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <details className="history-table">
        <summary>{h.tableToggle}</summary>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">{h.columns.run}</th>
                <th scope="col">{h.columns.date}</th>
                <th scope="col">{h.columns.status}</th>
                <th scope="col" className="num">{h.columns.tests}</th>
                <th scope="col" className="num">{h.columns.flaky}</th>
                <th scope="col" className="num">{h.columns.duration}</th>
                <th scope="col" className="num">{h.columns.a11y}</th>
              </tr>
            </thead>
            <tbody>
              {[...historial].reverse().map((e) => (
                <tr key={e.run ?? e.fecha}>
                  <td>{e.numero ? `#${e.numero}` : "—"}</td>
                  <td>{formatDate(e.fecha, lang, SHORT_DATE)}</td>
                  <td>
                    <StatusBadge status={e.estado} label={h.states[e.estado]} />
                  </td>
                  <td className="num">
                    {e.pasaron}/{e.total}
                  </td>
                  <td className="num">{e.flaky}</td>
                  <td className="num">{formatDuration(e.duracionMs, lang)}</td>
                  <td className="num">{e.accesibilidad ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  )
}
