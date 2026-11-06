import { CheckIcon, MinusIcon, RetryIcon, XIcon } from "../components/Icons"

// El estado siempre lleva ícono y texto, nunca solo color.
const VARIANTS = {
  paso: { className: "is-ok", Icon: CheckIcon },
  ok: { className: "is-ok", Icon: CheckIcon },
  fallo: { className: "is-fail", Icon: XIcon },
  flaky: { className: "is-flaky", Icon: RetryIcon },
  omitida: { className: "is-muted", Icon: MinusIcon },
  "sin-datos": { className: "is-muted", Icon: MinusIcon },
}

export default function StatusBadge({ status, label, large = false }) {
  const { className, Icon } = VARIANTS[status] ?? VARIANTS["sin-datos"]
  return (
    <span className={`status-badge ${className} ${large ? "is-large" : ""}`}>
      <Icon />
      {label}
    </span>
  )
}
