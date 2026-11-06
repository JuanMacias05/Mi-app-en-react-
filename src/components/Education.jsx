import { useLanguage } from "../i18n/language"
import SectionHeader from "./SectionHeader"

export default function Education() {
  const { t } = useLanguage()

  return (
    <section id="educacion" className="section" aria-labelledby="educacion-title">
      <SectionHeader id="educacion-title" number="04" title={t.ui.nav.educacion} />

      <ol className="timeline">
        {t.education.map((item) => (
          <li key={item.title} className="timeline-item">
            <div className="timeline-head">
              <h3>
                {item.title} <span className="timeline-org">· {item.school}</span>
              </h3>
              <p className="timeline-period">{item.period}</p>
            </div>
            {item.note && <p className="timeline-note">{item.note}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}
