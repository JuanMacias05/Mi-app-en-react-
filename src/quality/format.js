// Formatos del panel según el idioma activo.

const locale = (lang) => (lang === "en" ? "en-US" : "es-MX")

// 950 -> "1 s", 15296 -> "15 s", 4300 -> "4.3 s", 83000 -> "1 min 23 s"
export function formatDuration(ms, lang) {
  const seconds = ms / 1000
  if (seconds < 60) {
    const digits = seconds < 10 ? 1 : 0
    return `${new Intl.NumberFormat(locale(lang), { maximumFractionDigits: digits }).format(seconds)} s`
  }
  const total = Math.round(seconds)
  const min = Math.floor(total / 60)
  const rest = total % 60
  return rest ? `${min} min ${rest} s` : `${min} min`
}

export const formatSeconds = (s, lang) => formatDuration(s * 1000, lang)

export function formatDate(iso, lang, options = { dateStyle: "medium", timeStyle: "short" }) {
  return new Intl.DateTimeFormat(locale(lang), options).format(new Date(iso))
}

const UNITS = [
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
]

// "hace 2 horas" / "2 hours ago"
export function formatRelative(iso, lang, now = Date.now()) {
  const diff = Math.round((Date.parse(iso) - now) / 1000)
  const rtf = new Intl.RelativeTimeFormat(locale(lang), { numeric: "auto" })
  for (const [unit, size] of UNITS) {
    if (Math.abs(diff) >= size) return rtf.format(Math.round(diff / size), unit)
  }
  return rtf.format(diff, "second")
}
