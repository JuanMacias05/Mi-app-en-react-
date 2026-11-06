import { useEffect } from "react"

// Reproduce un fade corto en las secciones de <main> cuando entran en pantalla.
// El contenido nunca queda oculto: solo se anima al entrar (así axe y los lectores lo ven siempre).
// No hace nada si el visitante pidió reducir movimiento o el navegador no tiene IntersectionObserver.
export function useReveal(enabled = true) {
  useEffect(() => {
    if (!enabled || !("IntersectionObserver" in window)) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const targets = [...document.querySelectorAll("main section.section")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0 },
    )
    for (const el of targets) observer.observe(el)
    return () => {
      observer.disconnect()
      for (const el of targets) el.classList.remove("is-visible")
    }
  }, [enabled])
}
