// Pruebas unitarias del generador de calidad.json.   npm run test:unit
import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  actualizarHistorial,
  construirResumen,
  datosDelRun,
  MAX_HISTORIAL,
  resumirLighthouse,
  resumirPipeline,
  resumirPlaywright,
} from "./resumen.mjs"

const resultado = (status, duration, extra = {}) => ({ status, duration, retry: 0, errors: [], ...extra })

// Reporte mínimo con la forma real del reporter JSON de Playwright.
const reporte = {
  stats: { startTime: "2026-11-05T10:00:00.000Z", duration: 15234.7 },
  suites: [
    {
      title: "contacto.spec.js",
      file: "contacto.spec.js",
      specs: [],
      suites: [
        {
          title: "Formulario",
          file: "contacto.spec.js",
          specs: [
            { id: "a1", file: "contacto.spec.js", title: "envía", tests: [{ projectName: "escritorio", status: "expected", results: [resultado("passed", 1200.4)] }] },
            {
              id: "a2",
              file: "contacto.spec.js",
              title: "falla",
              tests: [
                {
                  projectName: "escritorio",
                  status: "unexpected",
                  results: [resultado("failed", 900, { error: { message: "\u001b[31mexpect(received).toBe(expected)\u001b[39m\n\nExpected: 1" } })],
                },
              ],
            },
          ],
          suites: [],
        },
      ],
    },
    {
      title: "navegacion.spec.js",
      file: "navegacion.spec.js",
      specs: [
        {
          id: "b1",
          file: "navegacion.spec.js",
          title: "menú",
          tests: [
            {
              projectName: "movil",
              status: "flaky",
              results: [resultado("timedOut", 30000, { errors: [{ message: "Test timeout of 30000ms exceeded." }] }), resultado("passed", 800)],
            },
          ],
        },
        { id: "b2", file: "navegacion.spec.js", title: "omitido", tests: [{ projectName: "movil", status: "skipped", results: [] }] },
      ],
      suites: [],
    },
  ],
}

describe("resumirPlaywright", () => {
  const { resumen, archivos, proyectos } = resumirPlaywright(reporte)

  it("cuenta cada estado", () => {
    assert.deepEqual(resumen, {
      total: 4,
      pasaron: 1,
      fallaron: 1,
      flaky: 1,
      omitidas: 1,
      duracionMs: 15235,
      inicio: "2026-11-05T10:00:00.000Z",
    })
  })

  it("agrupa por archivo y conserva el describe", () => {
    assert.deepEqual(archivos.map((a) => a.archivo), ["contacto.spec.js", "navegacion.spec.js"])
    assert.equal(archivos[0].tests[0].grupo, "Formulario")
    assert.equal(archivos[1].tests[0].grupo, "")
    assert.deepEqual(proyectos, ["escritorio", "movil"])
  })

  it("limpia el error: sin colores ANSI y solo la primera línea", () => {
    assert.equal(archivos[0].tests[1].error, "expect(received).toBe(expected)")
  })

  it("en un flaky guarda los intentos, la duración del último y el error del intento fallido", () => {
    const flaky = archivos[1].tests[0]
    assert.equal(flaky.intentos, 2)
    assert.equal(flaky.duracionMs, 800)
    assert.equal(flaky.error, "Test timeout of 30000ms exceeded.")
  })

  it("no inventa errores en los tests que pasaron", () => {
    assert.equal(archivos[0].tests[0].error, undefined)
  })

  it("devuelve null si no hay reporte", () => {
    assert.equal(resumirPlaywright(undefined), null)
  })
})

describe("resumirLighthouse", () => {
  const manifest = [
    { isRepresentativeRun: false, summary: { performance: 0.5, accessibility: 0.5 } },
    { isRepresentativeRun: true, summary: { performance: 0.874, accessibility: 1, "best-practices": 0.89, seo: 1 } },
  ]
  const config = {
    ci: {
      assert: {
        assertions: {
          "categories:performance": ["warn", { minScore: 0.9 }],
          "categories:accessibility": ["error", { minScore: 0.95 }],
          "categories:best-practices": ["error", { minScore: 0.9 }],
        },
      },
    },
  }

  it("usa la corrida representativa y los mínimos de lighthouserc", () => {
    const { corridas, categorias } = resumirLighthouse(manifest, config)
    assert.equal(corridas, 2)
    assert.deepEqual(categorias, [
      { id: "rendimiento", puntaje: 87, minimo: 90, nivel: "warn", cumple: false },
      { id: "accesibilidad", puntaje: 100, minimo: 95, nivel: "error", cumple: true },
      { id: "buenas-practicas", puntaje: 89, minimo: 90, nivel: "error", cumple: false },
      { id: "seo", puntaje: 100, minimo: null, nivel: null, cumple: true },
    ])
  })

  it("devuelve null sin manifiesto", () => {
    assert.equal(resumirLighthouse([], config), null)
  })
})

describe("resumirPipeline", () => {
  const jobs = {
    jobs: [
      {
        name: "Pruebas E2E",
        status: "completed",
        conclusion: "success",
        started_at: "2026-11-05T10:00:05Z",
        completed_at: "2026-11-05T10:02:05Z",
        steps: [
          { name: "Set up job", conclusion: "success", started_at: "2026-11-05T10:00:05Z", completed_at: "2026-11-05T10:00:07Z" },
          { name: "Correr pruebas", conclusion: "success", started_at: "2026-11-05T10:01:00Z", completed_at: "2026-11-05T10:01:45Z" },
          { name: "Post Run actions/checkout@v4", conclusion: "success", started_at: "2026-11-05T10:02:00Z", completed_at: "2026-11-05T10:02:01Z" },
        ],
      },
      { name: "Lighthouse", status: "completed", conclusion: "failure", started_at: "2026-11-05T10:00:00Z", completed_at: "2026-11-05T10:01:30Z", steps: [] },
      { name: "Publicar", status: "in_progress", conclusion: null, started_at: "2026-11-05T10:02:10Z", completed_at: null, steps: [] },
    ],
  }

  it("mide cada job desde el inicio del primero y omite el que sigue corriendo", () => {
    const { duracionS, jobs: salida } = resumirPipeline(jobs)
    assert.equal(duracionS, 125)
    assert.deepEqual(
      salida.map(({ nombre, estado, inicioS, duracionS: d }) => [nombre, estado, inicioS, d]),
      [
        ["Pruebas E2E", "paso", 5, 120],
        ["Lighthouse", "fallo", 0, 90],
      ],
    )
  })

  it("quita los pasos internos de GitHub", () => {
    assert.deepEqual(resumirPipeline(jobs).jobs[0].pasos, [{ nombre: "Correr pruebas", estado: "paso", duracionS: 45 }])
  })
})

describe("datosDelRun", () => {
  it("arma los enlaces del run y del commit", () => {
    const run = datosDelRun(
      { GITHUB_RUN_ID: "42", GITHUB_RUN_NUMBER: "7", GITHUB_REPOSITORY: "yo/repo", GITHUB_SHA: "abcdef1234567", GITHUB_REF_NAME: "main", GITHUB_EVENT_NAME: "push" },
      "Arreglar menú\n",
    )
    assert.equal(run.url, "https://github.com/yo/repo/actions/runs/42")
    assert.equal(run.commit, "abcdef1")
    assert.equal(run.commitUrl, "https://github.com/yo/repo/commit/abcdef1234567")
    assert.equal(run.mensaje, "Arreglar menú")
  })

  it("devuelve null fuera de GitHub Actions", () => {
    assert.equal(datosDelRun({}), null)
  })
})

describe("actualizarHistorial", () => {
  const entrada = (run, dia) => ({ run, fecha: `2026-10-${String(dia).padStart(2, "0")}T00:00:00Z` })

  it("reemplaza una corrida repetida (re-run) en vez de duplicarla", () => {
    const h = actualizarHistorial([entrada(1, 1), entrada(2, 2)], { ...entrada(2, 3), estado: "ok" })
    assert.deepEqual(h.map((e) => e.run), [1, 2])
    assert.equal(h[1].estado, "ok")
  })

  it(`conserva solo las últimas ${MAX_HISTORIAL}`, () => {
    const previos = Array.from({ length: MAX_HISTORIAL }, (_, i) => entrada(i + 1, (i % 28) + 1)).map((e, i) => ({
      ...e,
      fecha: new Date(Date.UTC(2026, 9, 1) + i * 3600_000).toISOString(),
    }))
    const h = actualizarHistorial(previos, { run: 999, fecha: "2026-11-05T00:00:00Z" })
    assert.equal(h.length, MAX_HISTORIAL)
    assert.equal(h[0].run, 2)
    assert.equal(h.at(-1).run, 999)
  })
})

describe("construirResumen", () => {
  const ahora = new Date("2026-11-05T12:00:00Z")

  it("marca fallo si hay un test fallido y lo registra en el historial", () => {
    const r = construirResumen({ reporte, ahora })
    assert.equal(r.estado, "fallo")
    assert.equal(r.historial.length, 1)
    assert.equal(r.historial[0].fallaron, 1)
  })

  it("ignora un historial anterior con otra versión del formato", () => {
    const r = construirResumen({ reporte, ahora, anterior: { version: 0, historial: [{ run: 1, fecha: "2026-01-01T00:00:00Z" }] } })
    assert.equal(r.historial.length, 1)
  })

  it("sin resultados de pruebas no dice que todo pasó", () => {
    const r = construirResumen({ ahora })
    assert.equal(r.estado, "sin-datos")
    assert.equal(r.resumen, null)
    assert.deepEqual(r.archivos, [])
  })
})
