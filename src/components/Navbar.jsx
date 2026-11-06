import { useEffect, useState } from "react"
import { profile, QUALITY_PATH, sectionIds } from "../data/profile"
import { useActiveSection } from "../hooks/useActiveSection"
import { useLanguage } from "../i18n/language"
import { MoonIcon, SunIcon } from "./Icons"

export default function Navbar({ theme, onToggleTheme, page = "inicio" }) {
  const [open, setOpen] = useState(false)
  const isHome = page === "inicio"
  // Fuera del portafolio las anclas apuntan a la página principal.
  const home = isHome ? "" : "/"
  const active = useActiveSection(isHome ? sectionIds : [])
  const { lang, toggleLang, t } = useLanguage()

  // Cierra el menú móvil con Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const isDark = theme === "dark"
  const nextLang = lang === "es" ? "en" : "es"

  return (
    <header className={`navbar ${open ? "is-open" : ""}`}>
      <nav className="container navbar-inner" aria-label={t.ui.mainNav}>
        <a href={`${home}#inicio`} className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark" aria-hidden="true">JM</span>
          {profile.name}
        </a>

        <ul id="nav-menu" className="nav-links">
          {sectionIds.map((id) => (
            <li key={id}>
              <a
                href={`${home}#${id}`}
                aria-current={active === id ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {t.ui.nav[id]}
              </a>
            </li>
          ))}
          <li>
            <a
              href={QUALITY_PATH}
              className="nav-quality"
              aria-current={page === "calidad" ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t.ui.navQuality}
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn lang-btn"
            onClick={toggleLang}
            aria-label={t.ui.langSwitch}
            title={t.ui.langSwitch}
          >
            <span lang={nextLang}>{nextLang.toUpperCase()}</span>
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={isDark ? t.ui.themeToLight : t.ui.themeToDark}
            title={isDark ? t.ui.themeToLight : t.ui.themeToDark}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? t.ui.menuClose : t.ui.menuOpen}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-toggle-bars" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  )
}
