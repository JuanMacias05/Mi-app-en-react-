import { useId, useState } from "react"
import { ArrowUpRightIcon } from "../components/Icons"
import { useLanguage } from "../i18n/language"
import { formatDuration } from "./format"
import StatusBadge from "./StatusBadge"

const FILTERS = ["todas", "fallo", "flaky"]

// Texto donde se busca: título, grupo, archivo y dispositivo en ambos nombres.
const haystack = (test, archivo, projects) =>
  `${test.titulo} ${test.grupo} ${archivo} ${test.proyecto} ${projects[test.proyecto] ?? ""}`.toLowerCase()

export default function TestResults({ data }) {
  const { t, lang } = useLanguage()
  const r = t.quality.tests
  const searchId = useId()
  // Si algo falló, eso es lo primero que se muestra.
  const [filter, setFilter] = useState(data.resumen?.fallaron ? "fallo" : "todas")
  const [query, setQuery] = useState("")

  const all = data.archivos.flatMap((a) => a.tests)
  const counts = { todas: all.length, fallo: all.filter((x) => x.estado === "fallo").length, flaky: all.filter((x) => x.estado === "flaky").length }
  const needle = query.trim().toLowerCase()

  const groups = data.archivos
    .map((a) => ({
      archivo: a.archivo,
      tests: a.tests.filter(
        (test) => (filter === "todas" || test.estado === filter) && (!needle || haystack(test, a.archivo, r.projects).includes(needle)),
      ),
    }))
    .filter((g) => g.tests.length > 0)
  const shown = groups.reduce((n, g) => n + g.tests.length, 0)
  const reportUrl = data.reportes?.e2e

  return (
    <section className="quality-section card" aria-labelledby="q-tests">
      <h2 id="q-tests">{r.title}</h2>

      <div className="tests-toolbar">
        <div className="segmented" role="group" aria-label={r.filterLabel}>
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {r.filters[f]} <span className="segmented-count">{counts[f]}</span>
            </button>
          ))}
        </div>
        <div className="tests-search">
          <label htmlFor={searchId}>{r.search}</label>
          <input id={searchId} type="search" value={query} placeholder={r.searchPlaceholder} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      <p className="tests-count" role="status">
        {r.showing(shown, all.length)}
      </p>

      {shown === 0 ? (
        <p className="quality-empty">{r.empty}</p>
      ) : (
        <table className="tests-table">
          <thead>
            <tr>
              <th scope="col">{r.columns.test}</th>
              <th scope="col">{r.columns.device}</th>
              <th scope="col">{r.columns.status}</th>
              <th scope="col" className="num">{r.columns.duration}</th>
            </tr>
          </thead>
          {groups.map((g) => (
            <tbody key={g.archivo}>
              <tr className="tests-file">
                <th scope="rowgroup" colSpan={4}>
                  <code>tests/{g.archivo}</code>
                </th>
              </tr>
              {g.tests.map((test) => (
                <tr key={`${test.id}-${test.proyecto}`} className={`is-${test.estado}`}>
                  <td className="tests-title" data-label={r.columns.test}>
                    {test.grupo && <span className="tests-group">{test.grupo}</span>}
                    <span>{test.titulo}</span>
                    {test.error && <code className="tests-error">{test.error}</code>}
                    {reportUrl && (
                      <a className="text-link tests-link" href={`${reportUrl}#?testId=${test.id}`} target="_blank" rel="noopener noreferrer">
                        {r.openReport} <ArrowUpRightIcon />
                        <span className="sr-only">: {test.titulo} ({t.ui.newTab})</span>
                      </a>
                    )}
                  </td>
                  <td data-label={r.columns.device}>{r.projects[test.proyecto] ?? test.proyecto}</td>
                  <td data-label={r.columns.status}>
                    <StatusBadge status={test.estado} label={r.states[test.estado]} />
                    {test.intentos > 1 && <span className="tests-attempts">{r.attempts(test.intentos)}</span>}
                  </td>
                  <td className="num" data-label={r.columns.duration}>
                    {formatDuration(test.duracionMs, lang)}
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      )}
    </section>
  )
}
