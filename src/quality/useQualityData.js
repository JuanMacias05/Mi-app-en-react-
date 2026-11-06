import { useCallback, useEffect, useState } from "react"

// Versión del formato que entiende el panel (ver scripts/calidad/resumen.mjs).
const VERSION = 1

// Descarga calidad.json. Devuelve { status: "loading" | "error" | "ready", data, retry }.
export function useQualityData(url) {
  const [state, setState] = useState({ status: "loading" })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetch(url, { signal: controller.signal, cache: "no-cache" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (data?.version !== VERSION) throw new Error(`Formato desconocido: ${data?.version}`)
        setState({ status: "ready", data })
      })
      .catch((error) => {
        if (error.name !== "AbortError") setState({ status: "error", error })
      })

    return () => controller.abort()
  }, [url, attempt])

  const retry = useCallback(() => {
    setState({ status: "loading" })
    setAttempt((n) => n + 1)
  }, [])

  return { ...state, retry }
}
