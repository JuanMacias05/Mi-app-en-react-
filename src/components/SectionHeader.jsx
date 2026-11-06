// Encabezado común para que todas las secciones se vean iguales.
export default function SectionHeader({ id, number, title, children }) {
  return (
    <header className="section-header">
      <div className="section-title-row">
        {number && <span className="section-number" aria-hidden="true">{number}</span>}
        <h2 id={id}>{title}</h2>
        <span className="section-rule" aria-hidden="true" />
      </div>
      {children && <p className="section-lead">{children}</p>}
    </header>
  )
}
