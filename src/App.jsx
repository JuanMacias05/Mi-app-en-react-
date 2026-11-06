import { lazy, Suspense } from "react"
import About from "./components/About"
import Contact from "./components/Contact"
import Education from "./components/Education"
import Experience from "./components/Experience"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Projects from "./components/Projects"
import { useTheme } from "./hooks/useTheme"
import { useLanguage } from "./i18n/language"

// El panel se carga aparte para no sumar peso a la página principal.
const QualityPage = lazy(() => import("./quality/QualityPage"))

function App({ page = "inicio" }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const isQuality = page === "calidad"

  return (
    <>
      <a href="#contenido" className="skip-link">{t.ui.skipLink}</a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} page={page} />
      <main id="contenido" className="container">
        {isQuality ? (
          <Suspense fallback={<p className="quality-loading" role="status">{t.quality.loading}</p>}>
            <QualityPage />
          </Suspense>
        ) : (
          <>
            <Hero />
            <Experience />
            <About />
            <Projects />
            <Education />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
