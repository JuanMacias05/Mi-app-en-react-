import AxeBuilder from "@axe-core/playwright"
import { expect } from "@playwright/test"

// Reglas WCAG 2.1 A y AA.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]

export async function expectNoViolations(page) {
  // Espera a que terminen las animaciones de entrada (fade de secciones, terminal) para
  // medir el contraste del estado final. Las infinitas (cursor) se ignoran.
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => {})),
    ),
  )
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
  // Resumen legible para que el reporte diga qué regla falló y dónde.
  const summary = violations.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`)
  expect(summary).toEqual([])
}
