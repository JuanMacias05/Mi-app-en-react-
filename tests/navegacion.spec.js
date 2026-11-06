import { expect, test } from "@playwright/test"

const secciones = [
  { nombre: "Experiencia", id: "experiencia" },
  { nombre: "Sobre mí", id: "sobre-mi" },
  { nombre: "Proyectos", id: "proyectos" },
  { nombre: "Educación", id: "educacion" },
  { nombre: "Contacto", id: "contacto" },
]

test.describe("Navegación", () => {
  test("cada enlace del menú lleva a su sección y la marca como activa", async ({ page }) => {
    await page.goto("/")
    const menu = page.getByRole("navigation", { name: "Principal" })

    for (const { nombre, id } of secciones) {
      const link = menu.getByRole("link", { name: nombre })
      await link.click()
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      await expect(page.locator(`#${id}`)).toBeInViewport()
      await expect(link).toHaveAttribute("aria-current", "true")
    }
  })

  test("muestra la información clave en el hero", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1, name: "Juan Macias" })).toBeVisible()
    await expect(page.getByText("QA Automation Engineer / SDET", { exact: true })).toBeVisible()
    await expect(page.getByText("Disponible para nuevas oportunidades")).toBeVisible()
    await expect(page).toHaveTitle("Juan Macias — QA Automation Engineer")
  })
})

test.describe("Móvil @movil", () => {
  test("el menú hamburguesa abre, navega y se cierra", async ({ page }) => {
    await page.goto("/")
    const toggle = page.getByRole("button", { name: "Abrir menú" })
    const menuLink = page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Proyectos" })

    await expect(menuLink).toBeHidden()
    await toggle.click()
    await expect(page.getByRole("button", { name: "Cerrar menú" })).toHaveAttribute("aria-expanded", "true")
    await expect(menuLink).toBeVisible()

    await menuLink.click()
    await expect(page.locator("#proyectos")).toBeInViewport()
    await expect(menuLink).toBeHidden()
  })

  test("Escape cierra el menú", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("button", { name: "Abrir menú" }).click()
    await page.keyboard.press("Escape")
    await expect(page.getByRole("button", { name: "Abrir menú" })).toHaveAttribute("aria-expanded", "false")
  })

  test("no hay desplazamiento horizontal", async ({ page }) => {
    await page.goto("/")
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow).toBe(false)
  })
})
