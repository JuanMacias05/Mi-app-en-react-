import { readFileSync } from "node:fs"
import { expect, test } from "@playwright/test"
import { expectNoViolations } from "./helpers/axe"

// El panel lee calidad.json de GitHub Pages; aquí se responde con un fixture que tiene
// un fallo, un flaky e historial, para no depender de la red ni del último run real.
const CALIDAD_JSON = "**/calidad.json"
const fixture = readFileSync(new URL("./fixtures/calidad.json", import.meta.url), "utf8")
const datos = JSON.parse(fixture)

const responderFixture = (page) =>
  page.route(CALIDAD_JSON, (route) => route.fulfill({ body: fixture, contentType: "application/json" }))

test.describe("Panel de calidad", () => {
  test.beforeEach(async ({ page }) => {
    await responderFixture(page)
  })

  test("se abre desde el menú y queda marcado como página actual", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Calidad" }).click()

    await expect(page).toHaveURL(/\/calidad$/)
    await expect(page).toHaveTitle("Panel de calidad — Juan Macias")
    await expect(page.getByRole("heading", { level: 1, name: "Panel de calidad" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Calidad" })).toHaveAttribute("aria-current", "page")
  })

  test("muestra el estado y el resumen de la última corrida", async ({ page }) => {
    await page.goto("/calidad")

    await expect(page.getByRole("region", { name: "Pipeline con fallos" })).toBeVisible()
    const resumen = page.getByRole("region", { name: "Resumen de la última corrida" })
    for (const [etiqueta, valor] of [["Pruebas E2E", "18/20"], ["Fallaron", "1"], ["Flaky", "1"], ["Duración de la suite", "15 s"]]) {
      const tarjeta = resumen.locator("div").filter({ has: page.getByRole("term").getByText(etiqueta, { exact: true }) })
      await expect(tarjeta.getByRole("definition").first(), etiqueta).toHaveText(valor)
    }
    await expect(page.getByRole("link", { name: /^a1b2c3d/ })).toHaveAttribute("href", datos.run.commitUrl)
    await expect(page.getByRole("link", { name: /Ver en GitHub Actions/ })).toHaveAttribute("href", datos.run.url)
  })

  test("abre la lista en las pruebas fallidas y muestra el error", async ({ page }) => {
    await page.goto("/calidad")

    await expect(page.getByRole("button", { name: /Fallaron/ })).toHaveAttribute("aria-pressed", "true")
    await expect(page.getByText("Mostrando 1 de 20 pruebas")).toBeVisible()
    const fila = page.getByRole("row", { name: /muestra un error si el servicio de correo falla/ })
    await expect(fila).toContainText("Falló")
    await expect(fila).toContainText("expect(locator).toContainText(expected)")

    // Enlace directo a la prueba dentro del reporte HTML de Playwright.
    const id = datos.archivos.find((a) => a.archivo === "contacto.spec.js").tests[3].id
    await expect(fila.getByRole("link", { name: /Abrir en el reporte/ })).toHaveAttribute("href", `${datos.reportes.e2e}#?testId=${id}`)
  })

  test("filtra por flaky y busca por texto", async ({ page }) => {
    await page.goto("/calidad")

    await page.getByRole("button", { name: /Flaky/ }).click()
    await expect(page.getByText("Mostrando 1 de 20 pruebas")).toBeVisible()
    await expect(page.getByRole("row", { name: /2 intentos/ })).toContainText("Móvil")

    await page.getByRole("button", { name: /Todas/ }).click()
    await expect(page.getByText("Mostrando 20 de 20 pruebas")).toBeVisible()

    await page.getByLabel("Buscar prueba").fill("descarga del CV")
    await expect(page.getByText("Mostrando 3 de 20 pruebas")).toBeVisible()

    await page.getByLabel("Buscar prueba").fill("no existe nada así")
    await expect(page.getByText("Ninguna prueba coincide con el filtro.")).toBeVisible()
  })

  test("muestra Lighthouse, el pipeline y el historial", async ({ page }) => {
    await page.goto("/calidad")

    const lighthouse = page.getByRole("region", { name: "Lighthouse" })
    await expect(lighthouse.getByRole("listitem")).toHaveCount(4)
    await expect(lighthouse).toContainText("mínimo 95")

    const pipeline = page.getByRole("region", { name: "Pipeline", exact: true })
    await expect(pipeline).toContainText("Lint, unitarias y E2E")
    await expect(pipeline).toContainText("Total: 2 min 21 s")

    const historial = page.getByRole("region", { name: "Historial" })
    await expect(historial.getByRole("list", { name: "Duración de la suite por corrida" }).getByRole("link")).toHaveCount(12)
    await historial.getByText("Ver como tabla").click()
    await expect(historial.getByRole("row")).toHaveCount(13)
  })

  test("sin violaciones WCAG en modo oscuro y claro", async ({ page }) => {
    for (const theme of ["dark", "light"]) {
      await page.addInitScript((t) => localStorage.setItem("theme", t), theme)
      await page.goto("/calidad")
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme)
      await expect(page.getByRole("region", { name: "Historial" })).toBeVisible()
      await expectNoViolations(page)
    }
  })
})

test.describe("Panel de calidad mientras carga", () => {
  test("muestra el esqueleto y lo reemplaza por los datos", async ({ page }) => {
    let responder
    const respuesta = new Promise((resolve) => (responder = resolve))
    await page.route(CALIDAD_JSON, async (route) => {
      await respuesta
      await route.fulfill({ body: fixture, contentType: "application/json" })
    })

    await page.goto("/calidad")
    const cargando = page.getByRole("status").filter({ hasText: "Cargando resultados del CI…" })
    await expect(cargando).toBeVisible()
    await expect(cargando).toHaveAttribute("aria-busy", "true")
    await expectNoViolations(page)

    responder()
    await expect(page.getByRole("region", { name: "Pipeline con fallos" })).toBeVisible()
    await expect(cargando).toHaveCount(0)
  })
})

test.describe("Panel de calidad sin datos", () => {
  test("avisa si no puede cargar los resultados y se recupera al reintentar", async ({ page }) => {
    let intentos = 0
    await page.route(CALIDAD_JSON, (route) => {
      intentos++
      return intentos === 1 ? route.fulfill({ status: 404, body: "Not found" }) : route.fulfill({ body: fixture, contentType: "application/json" })
    })

    await page.goto("/calidad")
    await expect(page.getByRole("alert")).toContainText("No se pudieron cargar los resultados del CI.")
    await expect(page.getByRole("link", { name: /Abrir GitHub Actions/ })).toBeVisible()

    await page.getByRole("button", { name: "Reintentar" }).click()
    await expect(page.getByRole("region", { name: "Pipeline con fallos" })).toBeVisible()
    expect(intentos).toBe(2)
  })

  test("rechaza un archivo con un formato que no conoce", async ({ page }) => {
    await page.route(CALIDAD_JSON, (route) => route.fulfill({ json: { version: 99 } }))
    await page.goto("/calidad")
    await expect(page.getByRole("alert")).toBeVisible()
  })
})

test.describe("Panel de calidad en inglés", () => {
  test.use({ locale: "en-US" })

  test("traduce el panel y el título de la página", async ({ page }) => {
    await responderFixture(page)
    await page.goto("/calidad")
    await expect(page).toHaveTitle("Quality dashboard — Juan Macias")
    await expect(page.getByRole("region", { name: "Pipeline failing" })).toBeVisible()
    await expect(page.getByText("Showing 1 of 20 tests")).toBeVisible()
  })
})

test.describe("Panel de calidad en móvil @movil", () => {
  test("se lee sin desplazamiento horizontal", async ({ page }) => {
    await responderFixture(page)
    await page.goto("/calidad")
    await expect(page.getByRole("region", { name: "Historial" })).toBeVisible()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow).toBe(false)
  })
})
