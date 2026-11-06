import { useLanguage } from "../i18n/language"

export default function LighthousePanel({ lighthouse }) {
  const { t } = useLanguage()
  const l = t.quality.lighthouse

  return (
    <section className="quality-section card" aria-labelledby="q-lighthouse">
      <h2 id="q-lighthouse">{l.title}</h2>
      <p className="quality-section-lead">{l.lead}</p>

      {lighthouse ? (
        <ul className="lh-list">
          {lighthouse.categorias.map((c) => (
            <li key={c.id} className={`lh-item ${c.cumple ? "" : "is-below"}`}>
              <div className="lh-head">
                <span className="lh-name">{l.categories[c.id] ?? c.id}</span>
                <span className="lh-score">{c.puntaje}</span>
              </div>
              {/* Barra decorativa: el número y el mínimo ya están en texto. */}
              <div className="lh-track" aria-hidden="true">
                <span className="lh-fill" style={{ width: `${c.puntaje}%` }} />
                {c.minimo != null && <span className="lh-min" style={{ left: `${c.minimo}%` }} />}
              </div>
              <p className="lh-note">
                {c.minimo != null && l.min(c.minimo)}
                {c.nivel === "warn" && ` · ${l.warnOnly}`}
                {!c.cumple && <strong> · {l.below}</strong>}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="quality-empty">{l.empty}</p>
      )}
    </section>
  )
}
