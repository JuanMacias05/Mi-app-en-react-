import { useLanguage } from "../i18n/language"
import SectionHeader from "./SectionHeader"

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experiencia" className="section" aria-labelledby="experiencia-title">
      <SectionHeader id="experiencia-title" number="01" title={t.ui.nav.experiencia} />

      <ol className="timeline">
        {t.experience.map((job) => (
          <li key={`${job.role}-${job.company}`} className="timeline-item">
            <div className="timeline-head">
              <h3>
                {job.role} <span className="timeline-org">· {job.company}</span>
              </h3>
              <p className="timeline-period">{job.period}</p>
            </div>
            {job.stats && (
              <ul className="job-stats">
                {job.stats.map((stat) => (
                  <li key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </li>
                ))}
              </ul>
            )}
            {job.groups.map((group) => (
              <div key={group.title} className="job-group">
                <h4>{group.title}</h4>
                <ul className="achievements">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </section>
  )
}
