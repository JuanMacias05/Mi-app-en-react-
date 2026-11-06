// Esqueleto del panel mientras llegan los datos: misma forma que el contenido final para que no salte.
// Los bloques son decorativos; el lector de pantalla solo escucha el texto de carga.

import { useLanguage } from "../i18n/language"

const Line = ({ w = "100%", h = 14, className = "" }) => <span className={`sk ${className}`} style={{ width: w, height: h }} />

function Panel({ rows }) {
  return (
    <div className="quality-section card sk-card">
      <Line w="35%" h={20} />
      <Line w="85%" />
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="sk-row">
          <Line w="45%" />
          <Line h={8} />
        </div>
      ))}
    </div>
  )
}

// withHeader: también dibuja el encabezado (se usa mientras se descarga el código del panel).
export default function QualitySkeleton({ withHeader = false }) {
  const { t } = useLanguage()

  return (
    <div className="quality-skeleton" role="status" aria-busy="true">
      <span className="sr-only">{t.quality.loading}</span>
      <div className="quality-skeleton-blocks" aria-hidden="true">
        {withHeader && (
          <div className="quality-header sk-header">
            <Line w={140} />
            <Line w={110} h={12} />
            <Line w="min(420px, 80%)" h={40} />
            <Line w="min(680px, 100%)" />
            <Line w="min(520px, 90%)" />
          </div>
        )}

        <div className="run-banner card sk-card">
          <div className="sk-inline">
            <Line w={170} h={34} className="sk-pill" />
            <Line w={70} h={30} />
            <Line w={180} h={30} />
            <Line w={90} h={30} />
          </div>
          <Line h={62} />
          <div className="sk-inline">
            <Line w={150} />
            <Line w={150} />
            <Line w={150} />
          </div>
        </div>

        <div className="kpis">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="kpi card sk-card">
              <Line w="55%" h={12} />
              <Line w="40%" h={30} />
              <Line w="70%" h={10} />
            </div>
          ))}
        </div>

        <div className="quality-grid">
          <Panel rows={4} />
          <Panel rows={2} />
        </div>

        <div className="quality-section card sk-card">
          <Line w="30%" h={20} />
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="sk-table-row">
              <Line w="55%" />
              <Line w="12%" />
              <Line w="10%" />
              <Line w="8%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
