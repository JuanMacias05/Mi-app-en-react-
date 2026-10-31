// Datos que no cambian con el idioma. Los textos están en content.es.js y content.en.js.
// TODO: reemplaza los valores entre [corchetes] en los archivos de contenido.

export const profile = {
  name: "Juan Macias",
  email: "juanmacias4250@gmail.com",
  // CV por idioma; los archivos están en /public.
  cv: {
    es: { href: "/cv-juan-macias.pdf", fileName: "CV-Juan-Carlos-Macias-ES.pdf" },
    en: { href: "/cv-juan-macias-en.pdf", fileName: "CV-Juan-Carlos-Macias-EN.pdf" },
  },
  socials: {
    github: "https://github.com/JuanMacias05",
    linkedin: "https://www.linkedin.com/in/juan-macias-5ba3a124b/",
  },
}

// Ids de las secciones (anclas del menú); el orden es el del menú.
export const sectionIds = ["experiencia", "sobre-mi", "proyectos", "educacion", "contacto"]

// Datos técnicos de cada caso de estudio; los textos van por id en los archivos de contenido.
// featured ocupa todo el ancho; internal = proyecto de trabajo con código privado; tests = enlace a las pruebas.
export const projectMeta = [
  {
    id: "test-report",
    featured: true,
    internal: true,
    tags: [
      "Python", "Playwright", "behave", "Allure", "GitHub Actions", "Docker",
      "Kubernetes (EKS)", "Helm", "AWS S3", "Node.js", "Slack API", "Xray",
    ],
  },
  { id: "screenshots", internal: true, tags: ["Playwright", "GitHub Actions", "Kubernetes", "Allure"] },
  {
    id: "portfolio",
    tags: ["React", "Vite", "CSS", "EmailJS", "Playwright", "GitHub Actions"],
    demo: "https://mi-app-en-react.vercel.app/",
    code: "https://github.com/JuanMacias05/Mi-app-en-react-",
    tests: "https://github.com/JuanMacias05/Mi-app-en-react-/tree/main/tests",
  },
]
