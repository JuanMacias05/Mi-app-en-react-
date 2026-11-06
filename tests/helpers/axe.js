import AxeBuilder from "@axe-core/playwright"
import { expect } from "@playwright/test"

// Reglas WCAG 2.1 A y AA.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]

export async function expectNoViolations(page) {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
  // Resumen legible para que el reporte diga qué regla falló y dónde.
  const summary = violations.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`)
  expect(summary).toEqual([])
}
