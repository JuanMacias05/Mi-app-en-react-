import { defineConfig, devices } from "@playwright/test"

const PORT = 4173

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // El JSON alimenta el panel de calidad (scripts/resumen-calidad.mjs).
  reporter: [
    process.env.CI ? ["github"] : ["list"],
    ["html", { open: "never" }],
    ["json", { outputFile: "resultados/playwright.json" }],
  ],

  use: {
    baseURL: `http://localhost:${PORT}`,
    // El sitio elige el idioma según el navegador; las pruebas parten de español.
    locale: "es-MX",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    { name: "escritorio", use: { ...devices["Desktop Chrome"] }, grepInvert: /@movil/ },
    { name: "movil", use: { ...devices["Pixel 7"] }, grep: /@movil/ },
  ],

  // Prueba la versión de producción, igual a la que publica Vercel.
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
