// Convierte los resultados crudos del CI en el resumen que lee el panel de calidad (/calidad).
// Funciones puras: reciben objetos ya leídos y no tocan disco ni red (ver resumen.test.mjs).

export const VERSION = 1
export const MAX_HISTORIAL = 30

// Estado de Playwright por test -> estado del panel.
const ESTADOS = { expected: "paso", unexpected: "fallo", flaky: "flaky", skipped: "omitida" }

// Pasos de GitHub Actions que no aportan al lector.
const PASOS_RUIDO = /^(Set up job|Complete job|Post )/

const sinAnsi = (s) => s.replace(/\u001b\[[0-9;]*m/g, "")

function primerError(resultados) {
  const conError = [...resultados].reverse().find((r) => r.error?.message || r.errors?.length)
  const mensaje = conError?.error?.message ?? conError?.errors?.[0]?.message
  if (!mensaje) return undefined
  const linea = sinAnsi(mensaje).trim().split("\n")[0]
  return linea.length > 240 ? `${linea.slice(0, 239)}…` : linea
}

// Recorre suites anidadas y devuelve una lista plana de tests con su archivo y grupo (describe).
function aplanar(suite, grupos = [], salida = []) {
  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      const resultados = test.results ?? []
      const ultimo = resultados.at(-1)
      salida.push({
        id: spec.id,
        archivo: spec.file,
        grupo: grupos.join(" › "),
        titulo: spec.title,
        proyecto: test.projectName,
        estado: ESTADOS[test.status] ?? "fallo",
        duracionMs: Math.round(ultimo?.duration ?? 0),
        intentos: resultados.length,
        error: test.status === "unexpected" || test.status === "flaky" ? primerError(resultados) : undefined,
      })
    }
  }
  // La suite raíz es el archivo; sus hijas son los describe.
  for (const hija of suite.suites ?? []) {
    aplanar(hija, hija.file === hija.title ? grupos : [...grupos, hija.title], salida)
  }
  return salida
}

export function resumirPlaywright(reporte) {
  if (!reporte?.suites) return null
  const tests = reporte.suites.flatMap((s) => aplanar(s))
  const contar = (estado) => tests.filter((t) => t.estado === estado).length

  const archivos = []
  for (const test of tests) {
    let grupo = archivos.find((a) => a.archivo === test.archivo)
    if (!grupo) archivos.push((grupo = { archivo: test.archivo, tests: [] }))
    const { archivo: _archivo, ...resto } = test
    grupo.tests.push(resto)
  }

  return {
    resumen: {
      total: tests.length,
      pasaron: contar("paso"),
      fallaron: contar("fallo"),
      flaky: contar("flaky"),
      omitidas: contar("omitida"),
      duracionMs: Math.round(reporte.stats?.duration ?? 0),
      inicio: reporte.stats?.startTime ?? null,
    },
    proyectos: [...new Set(tests.map((t) => t.proyecto))],
    archivos,
  }
}

const NOMBRES_LH = { performance: "rendimiento", accessibility: "accesibilidad", "best-practices": "buenas-practicas", seo: "seo" }

// manifest: lighthouse-report/manifest.json; config: lighthouserc.json (para los mínimos).
export function resumirLighthouse(manifest, config) {
  if (!Array.isArray(manifest) || manifest.length === 0) return null
  const corrida = manifest.find((m) => m.isRepresentativeRun) ?? manifest[0]
  const asserts = config?.ci?.assert?.assertions ?? {}

  const categorias = Object.entries(NOMBRES_LH)
    .filter(([clave]) => typeof corrida.summary?.[clave] === "number")
    .map(([clave, id]) => {
      const [nivel, opciones] = asserts[`categories:${clave}`] ?? []
      const minimo = opciones?.minScore != null ? Math.round(opciones.minScore * 100) : null
      const puntaje = Math.round(corrida.summary[clave] * 100)
      return { id, puntaje, minimo, nivel: nivel ?? null, cumple: minimo == null || puntaje >= minimo }
    })

  return { corridas: manifest.length, categorias }
}

const segundos = (a, b) => Math.max(0, Math.round((Date.parse(b) - Date.parse(a)) / 1000))

const estadoJob = (conclusion) => (conclusion === "success" ? "paso" : conclusion === "skipped" ? "omitida" : "fallo")

// jobs: respuesta de GET /repos/{repo}/actions/runs/{id}/jobs. Solo se incluyen los jobs terminados
// (el job que publica el panel sigue corriendo cuando se genera este archivo).
export function resumirPipeline(respuesta) {
  const jobs = (respuesta?.jobs ?? []).filter((j) => j.status === "completed" && j.started_at && j.completed_at)
  if (jobs.length === 0) return null

  const origen = Math.min(...jobs.map((j) => Date.parse(j.started_at)))
  const base = new Date(origen).toISOString()

  return {
    duracionS: Math.max(...jobs.map((j) => segundos(base, j.completed_at))),
    jobs: jobs.map((j) => ({
      nombre: j.name,
      estado: estadoJob(j.conclusion),
      inicioS: segundos(base, j.started_at),
      duracionS: segundos(j.started_at, j.completed_at),
      pasos: (j.steps ?? [])
        .filter((p) => p.started_at && p.completed_at && !PASOS_RUIDO.test(p.name))
        .map((p) => ({ nombre: p.name, estado: estadoJob(p.conclusion), duracionS: segundos(p.started_at, p.completed_at) })),
    })),
  }
}

// Datos del run a partir de las variables de entorno de GitHub Actions.
export function datosDelRun(env, mensaje) {
  if (!env.GITHUB_RUN_ID) return null
  const repo = `${env.GITHUB_SERVER_URL ?? "https://github.com"}/${env.GITHUB_REPOSITORY}`
  return {
    id: Number(env.GITHUB_RUN_ID),
    numero: Number(env.GITHUB_RUN_NUMBER),
    url: `${repo}/actions/runs/${env.GITHUB_RUN_ID}`,
    rama: env.GITHUB_REF_NAME ?? null,
    evento: env.GITHUB_EVENT_NAME ?? null,
    commit: env.GITHUB_SHA?.slice(0, 7) ?? null,
    commitUrl: env.GITHUB_SHA ? `${repo}/commit/${env.GITHUB_SHA}` : null,
    mensaje: mensaje?.trim() || null,
  }
}

export function estadoGeneral({ playwright, lighthouse, pipeline }) {
  const fallaTest = (playwright?.resumen.fallaron ?? 0) > 0
  const fallaLh = lighthouse?.categorias.some((c) => c.nivel === "error" && !c.cumple) ?? false
  const fallaJob = pipeline?.jobs.some((j) => j.estado === "fallo") ?? false
  if (fallaTest || fallaLh || fallaJob) return "fallo"
  // Sin resultados de pruebas no se puede afirmar que todo esté bien.
  return playwright ? "ok" : "sin-datos"
}

// Agrega la corrida actual al historial anterior: sin duplicados, en orden y con tope.
export function actualizarHistorial(anterior, entrada) {
  const previos = Array.isArray(anterior) ? anterior : []
  const clave = (e) => e.run ?? e.fecha
  return [...previos.filter((e) => clave(e) !== clave(entrada)), entrada]
    .sort((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha))
    .slice(-MAX_HISTORIAL)
}

export function construirResumen({ reporte, manifest, lhConfig, jobs, env = {}, mensaje, anterior, reportes, ahora = new Date() }) {
  const playwright = resumirPlaywright(reporte)
  const lighthouse = resumirLighthouse(manifest, lhConfig)
  const pipeline = resumirPipeline(jobs)
  const run = datosDelRun(env, mensaje)
  const estado = estadoGeneral({ playwright, lighthouse, pipeline })
  const fecha = ahora.toISOString()
  const puntaje = (id) => lighthouse?.categorias.find((c) => c.id === id)?.puntaje ?? null

  const entrada = {
    run: run?.id ?? null,
    numero: run?.numero ?? null,
    fecha,
    commit: run?.commit ?? null,
    estado,
    total: playwright?.resumen.total ?? 0,
    pasaron: playwright?.resumen.pasaron ?? 0,
    fallaron: playwright?.resumen.fallaron ?? 0,
    flaky: playwright?.resumen.flaky ?? 0,
    duracionMs: playwright?.resumen.duracionMs ?? 0,
    accesibilidad: puntaje("accesibilidad"),
    rendimiento: puntaje("rendimiento"),
  }

  return {
    version: VERSION,
    generado: fecha,
    estado,
    run,
    reportes: reportes ?? null,
    resumen: playwright?.resumen ?? null,
    proyectos: playwright?.proyectos ?? [],
    archivos: playwright?.archivos ?? [],
    lighthouse,
    pipeline,
    historial: actualizarHistorial(anterior?.version === VERSION ? anterior.historial : [], entrada),
  }
}
