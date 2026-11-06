// Textos del sitio en español.

const es = {
  meta: {
    title: "Juan Macias — QA Automation Engineer",
    description: "QA Automation Engineer / SDET: automatización E2E con Playwright, controles de calidad en CI/CD y reportes con Allure. También desarrollo en Python (FastAPI) y React (Next.js).",
  },

  ui: {
    skipLink: "Saltar al contenido",
    mainNav: "Principal",
    nav: {
      experiencia: "Experiencia",
      "sobre-mi": "Sobre mí",
      proyectos: "Proyectos",
      educacion: "Educación",
      contacto: "Contacto",
    },
    themeToLight: "Activar modo claro",
    themeToDark: "Activar modo oscuro",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    langSwitch: "EN · View in English",
    newTab: "se abre en una pestaña nueva",
    downloadCv: "Descargar CV",
    contactCta: "Contacto",
    summary: "Resumen",
    ciLast: "Última corrida del CI:",
    ciTests: "pruebas E2E",
    ciLink: "Ver el panel de calidad",
    skills: "Habilidades",
    projectsLead: "Casos de estudio: el problema, cómo lo resolví y qué se logró.",
    caseStudy: { problem: "Problema", solution: "Solución", howItWorks: "Cómo funciona", result: "Resultado" },
    technologies: "Tecnologías",
    demo: "Demo",
    code: "Código",
    tests: "Pruebas",
    of: "de",
    internalProject: "Proyecto interno, código privado",
    noPublicLinks: "Sin enlaces públicos por ahora",
    pipelineLabel: (n, titles) => `Flujo del pipeline en ${n} pasos: ${titles}.`,
    step: "Paso",
    contactLead: "Estoy buscando nuevas oportunidades como QA Automation Engineer o SDET. Si mi perfil encaja con tu equipo, escríbeme y te respondo pronto.",
    form: {
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando…",
      ok: "¡Mensaje enviado! Te responderé pronto.",
      error: "No se pudo enviar el mensaje. Intenta de nuevo o escríbeme directamente por correo.",
      errors: {
        nameRequired: "Escribe tu nombre.",
        emailRequired: "Escribe tu correo.",
        emailInvalid: "Escribe un correo válido, por ejemplo nombre@empresa.com.",
        messageShort: "El mensaje debe tener al menos 10 caracteres.",
      },
    },
    directContact: "Contacto directo",
    directTitle: "O contáctame directamente",
    emailLabel: "Correo",
    linkedinValue: "Conectemos",
    githubValue: "Mira mi código",
    madeWith: "Hecho con React.",
    navQuality: "Calidad",
    dashboard: "Panel de calidad",
  },

  hero: {
    availability: "Disponible para nuevas oportunidades",
    role: "QA Automation Engineer / SDET",
    tagline: "Pruebas automatizadas, controles de calidad en CI/CD y reportes claros, para desplegar sin sorpresas.",
    studies: "Estudiante de Ingeniería en Desarrollo de Software.",
    workMode: "Monterrey, México · Remoto o híbrido",
  },

  summary: [
    { label: "Rol actual", value: "QA Automation Engineer en Gencise.ai" },
    { label: "Experiencia", value: "Más de 1.5 años en pruebas de software" },
    { label: "Enfoque", value: "Automatización E2E, CI/CD y desarrollo full-stack" },
    { label: "Formación", value: "Ing. en Desarrollo de Software" },
    { label: "Idiomas", value: "Español nativo · Inglés B1" },
  ],

  experience: [
    {
      role: "QA Analyst / QA Automation Engineer",
      company: "Gencise.ai",
      period: "Mayo 2026 – Actualidad · insurtech de EE. UU., remoto",
      stats: [
        { value: "218", label: "PRs integrados en 17 repositorios" },
        { value: "200+", label: "PRs revisados" },
        { value: "6", label: "productos con pruebas automatizadas" },
        { value: "36%", label: "más rápida la corrida nocturna" },
      ],
      groups: [
        {
          title: "Automatización y framework de pruebas",
          items: [
            "Construí y amplié la automatización E2E de 6 productos (Bar & Tavern, Transportation, Property Insurance, Multi-Rater, Broker AI y Admin) con Python, Playwright y Behave (BDD/Gherkin): smoke, regresión, cálculo de primas, filtros, ordenamiento, paginación y validación de correos.",
            "Participé en el framework de nueva generación del equipo (pytest + Playwright): un registro de casos en YAML con validación, pruebas smoke seguras para producción (verificaciones previas, bloqueo de red y botón de paro) y casos smoke y sanity aprobados para staging y producción.",
            "Organicé las pruebas en 8 suites por etiquetas y agregué un estado de fallas conocidas (cuarentena) para que la corrida nocturna reporte solo errores reales de la aplicación.",
          ],
        },
        {
          title: "CI/CD e infraestructura",
          items: [
            "Integré las pruebas en GitHub Actions, ejecutándose en pods de Kubernetes (Helm): corridas nocturnas, regresiones por producto y pruebas smoke en producción y demo que se lanzan solas después de cada despliegue.",
            "Reduje el tiempo de la corrida nocturna de unos 119 a unos 76 minutos (36% más rápida) repartiendo las suites pesadas entre semana y corriendo la regresión completa los domingos.",
            "Hice el pipeline más confiable: un reintento automático cuando la falla es de infraestructura y no de la app, marcar en rojo los pods caídos o las corridas sin escenarios, y publicar los resultados aunque la corrida se interrumpa.",
          ],
        },
        {
          title: "Reportes y gestión de pruebas",
          items: [
            "Construí desde cero el reporte central de pruebas del equipo con Allure en AWS S3, con plugins propios: historial de corridas, resumen por producto, reporte de producción con datos ocultos y resultado de cada prueba con capturas de pantalla.",
            "Automaticé la publicación de resultados en Jira Xray (más de 60 casos de prueba con trazabilidad) y alertas en Slack que distinguen las fallas nuevas de las recurrentes, con enlace directo a la corrida que falló.",
            "Creé un flujo de verificación UAT que revisa un ticket de Jira en Staging y le adjunta la evidencia.",
          ],
        },
        {
          title: "Desarrollo full-stack",
          items: [
            "Entregué funcionalidades y correcciones en el producto principal: Next.js 16, React, TypeScript y Tailwind en el frontend; Python, FastAPI y PostgreSQL (migraciones con Alembic) en el backend.",
            "Construí de punta a punta el módulo de Problem Reports: búsqueda global, filtros, campos de estado y responsable, una página para que cada usuario vea sus propios reportes y sincronización bidireccional con Jira mediante una tarea programada.",
            "Desarrollé un dashboard de analítica y adopción (endpoint de API más interfaz) con acceso solo para administradores.",
            "Agregué reintentos y alertas en Slack para los envíos fallidos del procesamiento de documentos (Vision), y corregí errores de datos en la extracción del número DOT y en la clasificación de tipos de archivo.",
            "Creé una librería reutilizable de plantillas de correo HTML (paquete de Python) y migré a ella los correos de 6 servicios.",
          ],
        },
      ],
    },
    {
      role: "QA Intern",
      company: "MBQ Group",
      period: "Junio 2025 – Abril 2026",
      groups: [
        {
          title: "Pruebas manuales",
          items: [
            "Ejecuté pruebas manuales funcionales y de regresión siguiendo los procedimientos internos de QA, y documenté resultados y evidencias.",
            "Reporté y di seguimiento a defectos con el equipo de desarrollo, y mantuve organizada la documentación del proyecto.",
          ],
        },
      ],
    },
    {
      role: "Coordinador de Operaciones",
      company: "Syl 13 Seguridad Privada",
      period: "Enero 2025 – Enero 2026",
      groups: [
        {
          title: "Operaciones y equipo",
          items: [
            "Coordiné la cobertura de personal en las zonas asignadas, además de la nómina y la logística operativa.",
            "Dirigí el reclutamiento y la capacitación del personal nuevo.",
          ],
        },
      ],
    },
  ],

  about: [
    "Soy QA Automation Engineer con más de 1.5 años en pruebas de software, manuales y automatizadas. Mi trabajo es encontrar lo que se escapa: pruebas que pasan cuando no deberían, reportes que no dicen dónde falló algo y evidencia que se pierde en el camino.",
    "Además de pruebas, escribo código de producción: backends en Python (FastAPI) y frontends en TypeScript y React (Next.js). Entender cómo se construye lo que pruebo me ayuda a diseñar mejores casos y a corregir lo que encuentro. Uso agentes de IA para acelerar la creación y el análisis de pruebas.",
  ],

  skillGroups: [
    {
      title: "Automatización de pruebas",
      skills: ["Playwright", "pytest", "Behave (BDD / Gherkin)", "Allure", "Pruebas de API (requests, Postman)"],
    },
    {
      title: "Gestión de pruebas",
      skills: ["Jira", "Xray", "Diseño de casos de prueba", "Smoke / Sanity / Regresión / UAT", "Code review", "Análisis de pruebas flaky"],
    },
    {
      title: "CI/CD y nube",
      skills: ["GitHub Actions", "Docker", "Kubernetes", "Helm", "AWS S3", "Terraform (básico)"],
    },
    {
      title: "Desarrollo",
      skills: ["Python", "TypeScript", "JavaScript", "SQL", "Bash", "Next.js", "React", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    },
    {
      title: "Idiomas",
      skills: ["Español — Nativo", "Inglés — B1, uso diario en reuniones y por escrito"],
    },
  ],

  // Por id (ver projectMeta en profile.js). result puede ser texto o lista.
  projects: {
    "test-report": {
      title: "Plataforma de reportes de pruebas automatizadas",
      subtitle: "Diseñé y construí el reporte que el equipo usa a diario para dar seguimiento a la calidad de sus productos.",
      context: "Trabajo · QA",
      problem:
        "El equipo ejecutaba cientos de pruebas automatizadas al día en tres ambientes (staging, producción y demo), pero los resultados estaban dispersos. Saber qué había fallado, en qué ambiente y si se trataba de un error nuevo o de uno ya conocido requería revisar cada corrida por separado.",
      solution: {
        intro:
          "Desarrollé un reporte centralizado basado en Allure, publicado en AWS como sitio estático y actualizado automáticamente al terminar cada corrida. Sobre Allure construí plugins propios:",
        items: [
          "Vista general: el estado de cada producto y ambiente, con las suites con fallas en primer lugar.",
          "Historial de corridas: cada ejecución con sus resultados, la salida de consola y capturas de pantalla de las fallas.",
          "Reporte de producción: los resultados de cada despliegue, vinculados al despliegue que los originó.",
          "Resultados por prueba: escenarios agrupados por funcionalidad y enlazados a la corrida exacta donde fallaron.",
        ],
      },
      howItWorks: {
        steps: [
          { icon: "trigger", title: "Disparo", text: "GitHub Actions inicia la ejecución cada noche, en cada pull request y con cada despliegue." },
          { icon: "run", title: "Ejecución", text: "Las pruebas corren con Playwright en un contenedor Docker aislado dentro de Kubernetes." },
          { icon: "process", title: "Procesamiento", text: "Scripts en Python clasifican los resultados, generan el registro de la corrida y enmascaran datos sensibles." },
          { icon: "notify", title: "Notificación", text: "Los resultados se almacenan en S3, se notifican en Slack y se registran en Xray." },
          { icon: "publish", title: "Publicación", text: "Un segundo pipeline genera el reporte con Allure y lo publica como sitio estático." },
        ],
        paragraphs: [
          {
            lead: "Ejecución en el momento correcto",
            text: "Las pruebas se ejecutan automáticamente cada noche, en cada pull request y con cada despliegue a producción o demo, de modo que cada cambio se valida contra el ambiente que le corresponde. Cada ambiente tiene su propio control de concurrencia para que una ejecución nunca cancele a otra.",
          },
          {
            lead: "Entornos aislados y configurables",
            text: "Cada corrida se ejecuta en un pod de Kubernetes desplegado con Helm y configurado según su tipo: una suite reducida en la corrida nocturna, la suite completa los domingos y pruebas de humo en cada pull request. Las fallas causadas por la infraestructura se reintentan automáticamente.",
          },
          {
            lead: "Tolerancia a fallos",
            text: "Los pasos posteriores (clasificación, notificaciones y carga de resultados) no son bloqueantes: si alguno falla, el resultado de las pruebas no se altera. Al finalizar, el pipeline de pruebas activa la publicación del reporte de inmediato, con una ejecución programada diaria como respaldo.",
          },
          {
            lead: "Seguridad",
            text: "No se almacenan credenciales: el pod se autentica en AWS mediante la identidad de Kubernetes y el pipeline de publicación mediante OIDC. En producción y demo los datos de clientes se enmascaran, y las capturas se guardan como artefactos privados del CI con fecha de expiración.",
          },
        ],
      },
      result: [
        "Visibilidad inmediata: el equipo identifica qué falló, en qué ambiente y en qué corrida, sin revisar ejecución por ejecución.",
        "Validación automática en cada pull request y en cada despliegue a producción, no solo en la corrida nocturna.",
        "Distinción clara entre fallas reales de la aplicación y fallas ya conocidas, gracias a un sistema de estados definido con el equipo.",
        "Corrida nocturna optimizada de ~119 a ~76 minutos (≈36% más rápida).",
      ],
    },
    screenshots: {
      title: "Evidencia visual en las corridas nocturnas",
      subtitle: "Diagnostiqué por qué se perdían las capturas de pantalla y rediseñé cómo se generan.",
      context: "Trabajo · QA",
      problem:
        "Las corridas nocturnas terminaban sin capturas de pantalla. Cuando una prueba fallaba, el equipo solo contaba con el mensaje de error y tenía que reproducir el escenario para saber en qué paso y en qué pantalla había ocurrido.",
      solution: {
        intro: "Analicé el historial de ejecuciones y la configuración del pipeline, e identifiqué dos causas independientes:",
        items: [
          "Configuración: un cambio previo había desactivado las capturas en la corrida nocturna.",
          "Tiempo límite: algunas corridas alcanzaban el límite de 2 horas durante la carga de resultados y se interrumpían antes de subir la evidencia.",
        ],
        outro:
          "Evalué las alternativas con el equipo y adopté un esquema selectivo: captura automática en toda prueba fallida y, en las que pasan, solo cuando se solicita. Así se conserva la evidencia que importa y se mantiene acotado el volumen de archivos de cada corrida.",
      },
      result: {
        items: [
          "Cada prueba fallida queda documentada con una captura que muestra el estado exacto de la aplicación al momento del error.",
          "Diagnóstico más rápido: el equipo ubica dónde falló una prueba directamente desde el reporte, sin necesidad de reproducirla.",
          "En producción y demo, las capturas se guardan como artefactos privados con expiración para proteger los datos de clientes.",
        ],
        outro: "Siguiente paso: definir con el equipo la solución para las corridas que alcanzan el tiempo límite.",
      },
    },
    portfolio: {
      title: "Portafolio en React",
      subtitle: "Este sitio: diseñado, construido y probado por mí con el mismo criterio de calidad que aplico en el trabajo.",
      context: "Personal",
      problem: "Necesitaba presentar mi perfil de QA de forma clara para reclutadores de México y del extranjero, en un sitio rápido, accesible y fácil de mantener.",
      solution: {
        intro: "Lo construí con React y Vite, separando el contenido del diseño:",
        items: [
          "Versión completa en español e inglés, con el idioma del navegador como opción inicial.",
          "Modo claro y oscuro, recordado entre visitas y sin parpadeo al cargar.",
          "Accesibilidad: HTML semántico, foco visible, etiquetas en el formulario y respeto a la preferencia de reducir movimiento.",
          "Formulario de contacto con EmailJS, validación por campo y mensajes de estado.",
          "Pruebas end-to-end con Playwright en escritorio y móvil (formulario, descarga del CV, idiomas, tema y navegación), ejecutadas en GitHub Actions en cada pull request.",
          "Auditoría automática de accesibilidad (WCAG 2.1 AA) con axe en cada idioma, tema y en móvil.",
          "Lighthouse CI con mínimos de accesibilidad, buenas prácticas y SEO: si bajan, el pipeline falla.",
          "Un panel de calidad público que muestra los resultados reales de cada corrida del CI, generado por un script con sus propias pruebas unitarias.",
        ],
      },
      result: [
        "Un sitio ligero, publicado en Vercel, que se ve bien en móvil, tablet y escritorio.",
        "Todo el contenido vive en archivos de datos: actualizarlo no requiere tocar los componentes.",
        "La calidad es visible: cualquiera puede abrir el panel y ver qué pruebas corrieron, cuánto tardaron y si algo falló.",
      ],
    },
  },

  education: [
    {
      title: "Ingeniería en Desarrollo de Software",
      school: "Universidad Ciudadana",
      period: "Egreso estimado 2027",
      note: null,
    },
    // Si tomas un curso o te preparas para una certificación de inglés, agrégalo así:
    // { title: "Inglés — preparación para B2", school: "[Institución]", period: "En curso", note: null },
  ],

  // Panel de calidad (/calidad).
  quality: {
    meta: {
      title: "Panel de calidad — Juan Macias",
      description: "Resultados reales del pipeline de CI del portafolio de Juan Macias: pruebas E2E, accesibilidad, Lighthouse e historial de corridas.",
    },
    eyebrow: "Calidad en vivo",
    title: "Panel de calidad",
    lead: "Resultados reales del pipeline de este portafolio. Cada push a main corre lint, pruebas unitarias, pruebas E2E en escritorio y móvil, auditoría de accesibilidad con axe y Lighthouse. Aquí está la última corrida, sin editar.",
    back: "Volver al portafolio",
    status: { ok: "Pipeline en verde", fallo: "Pipeline con fallos", "sin-datos": "Sin resultados de pruebas" },
    localRun: "Corrida local (fuera de GitHub Actions)",
    run: "Corrida",
    commit: "Commit",
    branch: "Rama",
    generated: "Generado",
    links: { run: "Ver en GitHub Actions", e2e: "Reporte de Playwright", lighthouse: "Reporte de Lighthouse" },
    kpis: {
      label: "Resumen de la última corrida",
      tests: "Pruebas E2E",
      passedOf: (p, t) => `${p} de ${t} pasaron`,
      failed: "Fallaron",
      failedHint: "fallaron también al reintentar",
      flaky: "Flaky",
      flakyHint: "pasaron solo al reintentar",
      duration: "Duración de la suite",
      durationHint: (n) => `${n} dispositivos en paralelo`,
    },
    lighthouse: {
      title: "Lighthouse",
      lead: "Mediana de 3 corridas sobre la versión de producción. Si una categoría baja del mínimo, el pipeline falla.",
      categories: { rendimiento: "Rendimiento", accesibilidad: "Accesibilidad", "buenas-practicas": "Buenas prácticas", seo: "SEO" },
      min: (n) => `mínimo ${n}`,
      warnOnly: "solo avisa",
      below: "debajo del mínimo",
      empty: "Esta corrida no tiene resultados de Lighthouse.",
    },
    pipeline: {
      title: "Pipeline",
      lead: "Cuánto tardó cada job de GitHub Actions y cuándo empezó. Las pruebas y Lighthouse corren en paralelo.",
      total: "Total",
      steps: (n) => `Ver ${n} pasos`,
      empty: "La línea de tiempo aparece cuando el panel se genera en GitHub Actions.",
      startsAt: (s) => `empieza en ${s}`,
    },
    tests: {
      title: "Resultados por prueba",
      filterLabel: "Filtrar pruebas",
      filters: { todas: "Todas", fallo: "Fallaron", flaky: "Flaky" },
      search: "Buscar prueba",
      searchPlaceholder: "Ej. formulario, móvil, WCAG…",
      columns: { test: "Prueba", device: "Dispositivo", status: "Estado", duration: "Duración" },
      projects: { escritorio: "Escritorio", movil: "Móvil" },
      states: { paso: "Pasó", fallo: "Falló", flaky: "Flaky", omitida: "Omitida" },
      attempts: (n) => `${n} intentos`,
      openReport: "Abrir en el reporte",
      showing: (n, t) => `Mostrando ${n} de ${t} pruebas`,
      empty: "Ninguna prueba coincide con el filtro.",
    },
    history: {
      title: "Historial",
      lead: (n) => `Últimas ${n} corridas en main. La altura de cada barra es la duración de la suite E2E.`,
      chartLabel: "Duración de la suite por corrida",
      single: "Todavía hay una sola corrida; el historial crece con cada push a main.",
      tableToggle: "Ver como tabla",
      columns: { run: "Corrida", date: "Fecha", status: "Estado", tests: "Pruebas", flaky: "Flaky", duration: "Duración", a11y: "Accesib." },
      states: { ok: "Verde", fallo: "Falló", "sin-datos": "Sin datos" },
    },
    loading: "Cargando resultados del CI…",
    error: "No se pudieron cargar los resultados del CI.",
    errorHint: "Puede que el pipeline todavía no haya publicado. Las corridas también se pueden ver directo en GitHub Actions.",
    retry: "Reintentar",
    actionsLink: "Abrir GitHub Actions",
  },
}

export default es
