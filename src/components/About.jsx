import { useLanguage } from "../i18n/language"
import SectionHeader from "./SectionHeader"

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre-mi" className="section" aria-labelledby="sobre-mi-title">
      <SectionHeader id="sobre-mi-title" number="02" title={t.ui.nav["sobre-mi"]} />

      <div className="about-grid">
        <div className="about-text">
          {t.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="skill-groups">
          <h3 className="sr-only">{t.ui.skills}</h3>
          {t.skillGroups.map((group) => (
            <div key={group.title} className="skill-group">
              <h4>{group.title}</h4>
              <ul className="tag-list">
                {group.skills.map((skill) => (
                  <li key={skill} className="tag">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
