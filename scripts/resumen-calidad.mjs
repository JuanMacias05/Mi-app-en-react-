#!/usr/bin/env node
// Genera calidad.json para el panel /calidad a partir de lo que deja el CI.
// Cualquier entrada puede faltar (por ejemplo, si un job falló antes de terminar): esa sección sale vacía.
//
//   node scripts/resumen-calidad.mjs --salida public/calidad.json
//
// Opciones (todas opcionales):
//   --playwright  resultados/playwright.json        reporte JSON de Playwright
//   --lighthouse  lighthouse-report/manifest.json   manifiesto de Lighthouse CI
//   --lhrc        lighthouserc.json                 de aquí salen los mínimos
//   --jobs        jobs.json                         GET /repos/{repo}/actions/runs/{id}/jobs
//   --anterior    anterior.json                     calidad.json publicado antes (para el historial)
//   --reportes    https://…/                        URL base donde viven e2e/ y lighthouse/

import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { parseArgs } from "node:util"
import { construirResumen } from "./calidad/resumen.mjs"

const { values: args } = parseArgs({
  options: {
    playwright: { type: "string", default: "resultados/playwright.json" },
    lighthouse: { type: "string", default: "lighthouse-report/manifest.json" },
    lhrc: { type: "string", default: "lighthouserc.json" },
    jobs: { type: "string" },
    anterior: { type: "string" },
    reportes: { type: "string" },
    salida: { type: "string", default: "calidad.json" },
  },
})

function leerJson(ruta) {
  if (!ruta || !existsSync(ruta)) return undefined
  try {
    return JSON.parse(readFileSync(ruta, "utf8"))
  } catch (error) {
    console.warn(`⚠ No se pudo leer ${ruta}: ${error.message}`)
    return undefined
  }
}

function mensajeDelCommit() {
  try {
    return execFileSync("git", ["log", "-1", "--pretty=%s"], { encoding: "utf8" })
  } catch {
    return undefined
  }
}

const base = args.reportes?.replace(/\/?$/, "/")
const resumen = construirResumen({
  reporte: leerJson(args.playwright),
  manifest: leerJson(args.lighthouse),
  lhConfig: leerJson(args.lhrc),
  jobs: leerJson(args.jobs),
  anterior: leerJson(args.anterior),
  env: process.env,
  mensaje: mensajeDelCommit(),
  reportes: base ? { e2e: `${base}e2e/`, lighthouse: `${base}lighthouse/` } : null,
})

mkdirSync(dirname(args.salida), { recursive: true })
writeFileSync(args.salida, `${JSON.stringify(resumen, null, 2)}\n`)

const r = resumen.resumen
console.log(
  `✓ ${args.salida}: ${resumen.estado.toUpperCase()}` +
    (r ? ` · ${r.pasaron}/${r.total} pasaron, ${r.fallaron} fallaron, ${r.flaky} flaky` : " · sin resultados de Playwright") +
    ` · historial de ${resumen.historial.length} corrida(s)`,
)
