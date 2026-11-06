// Líneas de respaldo mientras carga calidad.json (o si falla): títulos reales de la suite.
const FALLBACK = [
  { proyecto: "escritorio", archivo: "cv.spec.js", titulo: "descarga el CV en español", duracionMs: 495 },
  { proyecto: "escritorio", archivo: "contacto.spec.js", titulo: "rechaza un correo con formato inválido", duracionMs: 2731 },
  { proyecto: "escritorio", archivo: "accesibilidad.spec.js", titulo: "sin violaciones WCAG en español, modo dark", duracionMs: 2214 },
  { proyecto: "movil", archivo: "navegacion.spec.js", titulo: "el menú hamburguesa abre, navega y se cierra", duracionMs: 1520 },
]

function formatDuration(ms) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`
}

// Toma la primera prueba que pasó de cada archivo, hasta 4.
function pickLines(data) {
  const lines = []
  for (const { archivo, tests } of data?.archivos ?? []) {
    const ok = tests.find((t) => t.estado === "paso")
    if (ok) lines.push({ ...ok, archivo })
    if (lines.length === 4) break
  }
  return lines.length ? lines : FALLBACK
}

// Terminal decorativa del hero: los datos accesibles están en la línea del CI.
export default function HeroTerminal({ data }) {
  const lines = pickLines(data)
  const resumen = data?.resumen
  const total = resumen?.total ?? 30
  const passed = resumen?.pasaron ?? 30
  const duration = resumen?.duracionMs ?? 15645

  let step = 0
  const delay = () => ({ animationDelay: `${0.2 + 0.25 * step++}s` })

  return (
    <div className="hero-terminal" aria-hidden="true">
      <div className="terminal-bar">
        <span>npm test</span>
        <span>main · CI</span>
      </div>
      <pre className="terminal-body">
        <span className="terminal-line" style={delay()}><span className="t-accent">$</span> npm test</span>
        <span className="terminal-line t-subtle" style={delay()}>Running {total} tests using 2 workers</span>
        {lines.map((l) => (
          <span key={l.archivo} className="terminal-line" style={delay()}>
            {"  "}<span className="t-ok">✓</span> <span className="t-subtle">[{l.proyecto}] › {l.archivo} ›</span> {l.titulo}{" "}
            <span className="t-subtle">({formatDuration(l.duracionMs)})</span>
          </span>
        ))}
        <span className="terminal-line t-subtle" style={delay()}>{"  "}…</span>
        <span className="terminal-line" style={delay()}>
          {"  "}<span className="t-ok">{passed} passed</span> <span className="t-subtle">({formatDuration(duration)})</span>
        </span>
        <span className="terminal-line" style={delay()}><span className="t-accent">$</span> <span className="terminal-cursor" /></span>
      </pre>
    </div>
  )
}
