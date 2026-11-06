import { expect, test } from "@playwright/test"
import { expectNoViolations } from "./helpers/axe"

// Revisa las reglas WCAG 2.1 A y AA con axe en cada combinación de idioma y tema.

test.describe("Accesibilidad", () => {
  for (const theme of ["dark", "light"]) {
    test(`sin violaciones WCAG en español, modo ${theme}`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem("theme", t), theme)
      await page.goto("/")
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme)
      await expectNoViolations(page)
    })
  }

  test.describe("con el navegador en inglés", () => {
    test.use({ locale: "en-US" })

    test("sin violaciones WCAG en inglés", async ({ page }) => {
      await page.goto("/")
      await expect(page.locator("html")).toHaveAttribute("lang", "en")
      await expectNoViolations(page)
    })
  })

  test("los errores del formulario son accesibles", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("button", { name: "Enviar mensaje" }).click()
    await expect(page.getByLabel("Nombre")).toHaveAttribute("aria-invalid", "true")
    await expectNoViolations(page)
  })
})

test.describe("Accesibilidad en móvil @movil", () => {
  test("sin violaciones WCAG con el menú abierto", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("button", { name: "Abrir menú" }).click()
    await expect(page.getByRole("button", { name: "Cerrar menú" })).toBeVisible()
    await expectNoViolations(page)
  })
})
