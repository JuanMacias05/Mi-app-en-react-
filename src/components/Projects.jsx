import { projectMeta } from "../data/profile"
import { useLanguage } from "../i18n/language"
import ProjectCard from "./ProjectCard"
import SectionHeader from "./SectionHeader"

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="proyectos" className="section" aria-labelledby="proyectos-title">
      <SectionHeader id="proyectos-title" number="03" title={t.ui.nav.proyectos}>
        {t.ui.projectsLead}
      </SectionHeader>

      <ul className="projects-grid">
        {projectMeta.map((meta) => (
          <li key={meta.id} className={meta.featured ? "is-featured" : undefined}>
            <ProjectCard project={{ ...meta, ...t.projects[meta.id] }} />
          </li>
        ))}
      </ul>
    </section>
  )
}
