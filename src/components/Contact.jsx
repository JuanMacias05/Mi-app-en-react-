import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { profile } from "../data/profile"
import { useLanguage } from "../i18n/language"
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons"
import SectionHeader from "./SectionHeader"

// Los nombres de los campos (nombre, email, mensaje) deben coincidir con la plantilla de EmailJS.
// Los valores vienen de .env.local (local) y de las variables de entorno de Vercel (producción).
const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE_LENGTH = 10

// Devuelve { campo: claveDelError }; el texto se busca al pintar para que siga el idioma activo.
function validate(values) {
  const errors = {}
  if (!values.nombre.trim()) errors.nombre = "nameRequired"
  if (!values.email.trim()) errors.email = "emailRequired"
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "emailInvalid"
  if (values.mensaje.trim().length < MIN_MESSAGE_LENGTH) errors.mensaje = "messageShort"
  return errors
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const { ui } = t
  const form = ui.form
  const formRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("idle") // idle | sending | ok | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const el = formRef.current
    const data = new FormData(el)
    const values = {
      nombre: data.get("nombre") ?? "",
      email: data.get("email") ?? "",
      mensaje: data.get("mensaje") ?? "",
    }

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      el.elements[Object.keys(found)[0]].focus()
      return
    }

    setStatus("sending")
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, el, EMAILJS.publicKey)
      setStatus("ok")
      el.reset()
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  // Limpia el error de un campo en cuanto el usuario lo corrige.
  const clearError = (e) => {
    const { name } = e.target
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const fieldProps = (name) => ({
    id: name,
    name,
    onInput: clearError,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  })

  const directLinks = [
    { href: `mailto:${profile.email}`, label: ui.emailLabel, value: profile.email, Icon: MailIcon },
    { href: profile.socials.linkedin, label: "LinkedIn", value: ui.linkedinValue, Icon: LinkedInIcon, external: true },
    { href: profile.socials.github, label: "GitHub", value: ui.githubValue, Icon: GitHubIcon, external: true },
  ]

  const sending = status === "sending"

  return (
    <section id="contacto" className="section" aria-labelledby="contacto-title">
      <SectionHeader id="contacto-title" title={ui.nav.contacto}>
        {ui.contactLead}
      </SectionHeader>

      <div className="contact-grid">
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
          <Field id="nombre" label={form.name} error={form.errors[errors.nombre]}>
            <input type="text" autoComplete="name" required {...fieldProps("nombre")} />
          </Field>
          <Field id="email" label={form.email} error={form.errors[errors.email]}>
            <input type="email" autoComplete="email" required {...fieldProps("email")} />
          </Field>
          <Field id="mensaje" label={form.message} error={form.errors[errors.mensaje]}>
            <textarea rows="6" required minLength={MIN_MESSAGE_LENGTH} {...fieldProps("mensaje")} />
          </Field>

          <button type="submit" className="btn btn-primary" disabled={sending} aria-busy={sending}>
            {sending && <span className="spinner" aria-hidden="true" />}
            {sending ? form.sending : form.send}
          </button>

          <p className={`form-status ${status}`} role="status" aria-live="polite">
            {status === "ok" && form.ok}
            {status === "error" && form.error}
          </p>
        </form>

        <aside className="contact-direct card" aria-label={ui.directContact}>
          <p className="contact-direct-title">{ui.directTitle}</p>
          <ul>
            {directLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="direct-link"
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <span className="direct-icon"><link.Icon /></span>
                  <span>
                    <span className="direct-label">{link.label}</span>
                    <span className="direct-value">{link.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
