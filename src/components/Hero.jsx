import { profile, quality, QUALITY_PATH } from "../data/profile"
import { useLanguage } from "../i18n/language"
import { useQualityData } from "../quality/useQualityData"
import HeroTerminal from "./HeroTerminal"
import { DownloadIcon } from "./Icons"
import SocialLinks from "./SocialLinks"

export default function Hero() {
  const { lang, t } = useLanguage()
  const { hero, summary, ui } = t
  const cv = profile.cv[lang]
  const { status, data } = useQualityData(quality.dataUrl)
  const ready = status === "ready"
  const lighthouse = data?.lighthouse?.categorias

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-main">
        <div className="hero-text">
          <p className="availability">
            <span className="availability-dot" aria-hidden="true" />
            {hero.availability}
          </p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero-role">{hero.role}</p>
          <p className="hero-tagline">{hero.tagline}</p>
          <p className="hero-meta">
            {hero.workMode}
            <br />
            {hero.studies}
          </p>

          <div className="hero-actions">
            <a href={cv.href} download={cv.fileName} className="btn btn-primary">
              <DownloadIcon />
              {ui.downloadCv}
            </a>
            <a href="#contacto" className="btn btn-secondary">{ui.contactCta}</a>
          </div>

          <SocialLinks className="hero-socials" />
        </div>

        <HeroTerminal data={ready ? data : null} />
      </div>

      <dl className="hero-facts" aria-label={ui.summary}>
        {summary.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      {ready && data.resumen && (
        <p className="hero-ci">
          <span>{ui.ciLast}</span>
          <span>
            <strong className="hero-ci-ok">{data.resumen.pasaron}/{data.resumen.total}</strong> {ui.ciTests}
          </span>
          {lighthouse?.length > 0 && (
            <span>
              Lighthouse <strong>{lighthouse.map((c) => c.puntaje).join(" · ")}</strong>
            </span>
          )}
          <a href={QUALITY_PATH} className="hero-ci-link">{ui.ciLink} →</a>
        </p>
      )}
    </section>
  )
}
