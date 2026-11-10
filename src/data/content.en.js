// Site copy in English. Keep the same keys as content.es.js.

const en = {
  meta: {
    title: "Juan Macias — QA Automation Engineer",
    description: "QA Automation Engineer / SDET: E2E automation with Playwright, CI/CD quality gates and Allure reporting. Also builds Python (FastAPI) and React (Next.js) features.",
  },

  ui: {
    skipLink: "Skip to content",
    mainNav: "Main",
    nav: {
      experiencia: "Experience",
      "sobre-mi": "About",
      proyectos: "Projects",
      educacion: "Education",
      contacto: "Contact",
    },
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langSwitch: "ES · Ver en español",
    newTab: "opens in a new tab",
    downloadCv: "Download CV",
    contactCta: "Contact",
    summary: "Summary",
    ciLast: "Latest CI run:",
    ciTests: "E2E tests",
    ciLink: "See the quality dashboard",
    skills: "Skills",
    projectsLead: "Case studies: the problem, how I solved it and what it achieved.",
    caseStudy: { problem: "Problem", solution: "Solution", howItWorks: "How it works", result: "Result" },
    technologies: "Technologies",
    demo: "Demo",
    code: "Code",
    tests: "Tests",
    of: "for",
    internalProject: "Internal project, private code",
    noPublicLinks: "No public links yet",
    pipelineLabel: (n, titles) => `Pipeline flow in ${n} steps: ${titles}.`,
    step: "Step",
    contactLead: "I'm looking for new opportunities as a QA Automation Engineer or SDET. If my profile fits your team, write to me and I'll get back to you soon.",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      ok: "Message sent! I'll get back to you soon.",
      error: "The message couldn't be sent. Please try again or email me directly.",
      errors: {
        nameRequired: "Please enter your name.",
        emailRequired: "Please enter your email.",
        emailInvalid: "Please enter a valid email, e.g. name@company.com.",
        messageShort: "Your message must be at least 10 characters long.",
      },
    },
    directContact: "Direct contact",
    directTitle: "Or reach me directly",
    emailLabel: "Email",
    linkedinValue: "Let's connect",
    githubValue: "See my code",
    madeWith: "Built with React.",
    navQuality: "Quality",
    dashboard: "Quality dashboard",
  },

  hero: {
    availability: "Open to new opportunities",
    role: "QA Automation Engineer / SDET",
    tagline: "Automated tests, CI/CD quality gates and clear reports, so deployments hold no surprises.",
    studies: "Software Development Engineering student.",
    workMode: "Monterrey, Mexico · Remote or hybrid",
  },

  summary: [
    { label: "Current role", value: "QA Automation Engineer at Gencise.ai" },
    { label: "Experience", value: "1.5+ years in software testing" },
    { label: "Focus", value: "E2E automation, CI/CD and full-stack development" },
    { label: "Education", value: "Software Development Engineering" },
    { label: "Languages", value: "Native Spanish · English B1" },
  ],

  experience: [
    {
      role: "QA Analyst / QA Automation Engineer",
      company: "Gencise.ai",
      period: "May 2026 – Present · US insurtech, remote",
      stats: [
        { value: "218", label: "PRs merged across 17 repositories" },
        { value: "200+", label: "PRs reviewed" },
        { value: "6", label: "products with automated tests" },
        { value: "36%", label: "faster nightly run" },
      ],
      groups: [
        {
          title: "Test automation and framework",
          items: [
            "Built and expanded E2E automation for 6 products (Bar & Tavern, Transportation, Property Insurance, Multi-Rater, Broker AI, Admin) with Python, Playwright and Behave (BDD/Gherkin): smoke, regression, rating and premium-math correctness, filters, sorting, pagination and email checks.",
            "Contributed to the team's next-generation framework (pytest + Playwright): a YAML case registry with validation, production-safe smoke tests (preflight checks, network blocking, kill switch) and approved smoke/sanity cases for staging and production.",
            "Organized tests into 8 tagged suites, and added a known-failure (quarantine) status so the nightly run reports only real application bugs.",
          ],
        },
        {
          title: "CI/CD and infrastructure",
          items: [
            "Wired tests into GitHub Actions, running in Kubernetes pods (Helm): nightly runs, per-product regression runs, and production and demo smoke tests that start automatically after every deploy.",
            "Cut nightly run time from about 119 to about 76 minutes (36% faster) by splitting heavy suites across weekdays and running a full regression on Sundays.",
            "Made the pipeline more reliable: one automatic retry when the failure is infrastructure rather than the app, failing red on dead pods or zero-scenario runs, and publishing results even when a run is interrupted.",
          ],
        },
        {
          title: "Reporting and test management",
          items: [
            "Built the team's central test report from scratch with Allure on AWS S3, adding custom plugins: run history, per-product overview, a redacted production report, and per-test results with screenshots.",
            "Automated publishing of results to Jira Xray (60+ test cases with traceability) and Slack alerts that separate new failures from recurring ones, with links to the exact failed run.",
            "Built a UAT verification flow that checks a Jira ticket in Staging and attaches the evidence to it.",
          ],
        },
        {
          title: "Full-stack development",
          items: [
            "Shipped features and fixes in the main product: Next.js 16, React, TypeScript and Tailwind on the frontend; Python, FastAPI and PostgreSQL (Alembic migrations) on the backend.",
            "Built the Problem Reports module end to end: global search, filters, status and assignee fields, a reporter's own report page, and two-way Jira sync with a scheduled job.",
            "Built an analytics/adoption dashboard (API endpoint plus UI) restricted to admin users.",
            "Added retries and Slack alerts for failed document-processing (Vision) forwards, and fixed data issues in DOT-number extraction and file-type classification.",
            "Built a shared, reusable HTML email-layout library (Python package) and moved the emails of 6 services onto it.",
          ],
        },
      ],
    },
    {
      role: "QA Intern",
      company: "MBQ Group",
      period: "Jun 2025 – Apr 2026",
      groups: [
        {
          title: "Manual testing",
          items: [
            "Ran manual functional and regression tests following internal QA procedures, and documented results and evidence.",
            "Reported and tracked defects with the development team, and kept the project documentation organized.",
          ],
        },
      ],
    },
    {
      role: "Operations Coordinator",
      company: "Syl 13 Seguridad Privada",
      period: "Jan 2025 – Jan 2026",
      groups: [
        {
          title: "Operations and team",
          items: [
            "Coordinated staff coverage across assigned zones, plus payroll and operational logistics.",
            "Led recruiting and training for new staff.",
          ],
        },
      ],
    },
  ],

  about: [
    "I'm a QA Automation Engineer with 1.5+ years of software testing experience, manual and automated. My job is to find what slips through: tests that pass when they shouldn't, reports that don't say where something failed, evidence that gets lost along the way.",
    "I write production code as well as tests: Python (FastAPI) backends and TypeScript/React (Next.js) frontends. Knowing how the things I test are built helps me design better cases and fix what I find. I use AI coding agents (Claude Code and Codex) to design test cases, write automation and triage failures.",
  ],

  skillGroups: [
    {
      title: "Test automation",
      skills: ["Playwright", "pytest", "Behave (BDD / Gherkin)", "Allure", "API testing (requests, Postman)"],
    },
    {
      title: "Test management",
      skills: ["Jira", "Xray", "Test case design", "Smoke / Sanity / Regression / UAT", "Code review", "Flaky test root-cause analysis"],
    },
    {
      title: "CI/CD and cloud",
      skills: ["GitHub Actions", "Docker", "Kubernetes", "Helm", "AWS S3", "Terraform (basic)"],
    },
    {
      title: "Development",
      skills: ["Python", "TypeScript", "JavaScript", "SQL", "Bash", "Next.js", "React", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    },
    {
      title: "AI for QA and development",
      skills: ["Claude Code", "Codex", "AI-assisted test case design", "AI-assisted test automation"],
    },
    {
      title: "Languages",
      skills: ["Spanish — Native", "English — B1, used daily in meetings and in writing"],
    },
  ],

  projects: {
    "test-report": {
      title: "Automated test reporting platform",
      subtitle: "I designed and built the report the team uses every day to track the quality of its products.",
      context: "Work · QA",
      problem:
        "The team ran hundreds of automated tests a day across three environments (staging, production and demo), but results were scattered. Finding out what had failed, in which environment, and whether it was a new error or an already-known one meant going through each run separately.",
      solution: {
        intro:
          "I developed a centralized report based on Allure, published on AWS as a static site and updated automatically when each run finishes. On top of Allure I built custom plugins:",
        items: [
          "Overview: the status of each product and environment, with failing suites first.",
          "Run history: every execution with its results, console output and screenshots of failures.",
          "Production report: the results of each deployment, linked to the deployment that triggered them.",
          "Per-test results: scenarios grouped by feature and linked to the exact run where they failed.",
        ],
      },
      howItWorks: {
        steps: [
          { icon: "trigger", title: "Trigger", text: "GitHub Actions starts a run every night, on every pull request and with every deployment." },
          { icon: "run", title: "Execution", text: "Tests run with Playwright in an isolated Docker container inside Kubernetes." },
          { icon: "process", title: "Processing", text: "Python scripts classify results, build the run record and mask sensitive data." },
          { icon: "notify", title: "Notification", text: "Results are stored in S3, announced in Slack and logged in Xray." },
          { icon: "publish", title: "Publishing", text: "A second pipeline builds the report with Allure and publishes it as a static site." },
        ],
        paragraphs: [
          {
            lead: "Running at the right moment",
            text: "Tests run automatically every night, on every pull request and with every deployment to production or demo, so each change is validated against the right environment. Each environment has its own concurrency control so one run never cancels another.",
          },
          {
            lead: "Isolated, configurable environments",
            text: "Each run executes in a Kubernetes pod deployed with Helm and configured by run type: a reduced suite in the nightly run, the full suite on Sundays and smoke tests on every pull request. Failures caused by infrastructure are retried automatically.",
          },
          {
            lead: "Fault tolerance",
            text: "Post-run steps (classification, notifications and result upload) are non-blocking: if one fails, the test outcome is unaffected. When it finishes, the test pipeline triggers the report publication right away, with a scheduled daily run as a fallback.",
          },
          {
            lead: "Security",
            text: "No credentials are stored: the pod authenticates to AWS through Kubernetes identity and the publishing pipeline through OIDC. In production and demo, customer data is masked, and screenshots are kept as private, expiring CI artifacts.",
          },
        ],
      },
      result: [
        "Immediate visibility: the team sees what failed, in which environment and in which run, without going through runs one by one.",
        "Automatic validation on every pull request and every production deployment, not just in the nightly run.",
        "A clear distinction between real application failures and already-known ones, thanks to a status system defined with the team.",
        "Nightly run optimized from ~119 to ~76 minutes (≈36% faster).",
      ],
    },
    screenshots: {
      title: "Visual evidence in nightly runs",
      subtitle: "I diagnosed why screenshots were being lost and redesigned how they are generated.",
      context: "Work · QA",
      problem:
        "Nightly runs finished without screenshots. When a test failed, the team only had the error message and had to reproduce the scenario to find out at which step and on which screen it happened.",
      solution: {
        intro: "I analyzed the run history and the pipeline configuration, and identified two independent causes:",
        items: [
          "Configuration: an earlier change had disabled screenshots in the nightly run.",
          "Time limit: some runs hit the 2-hour limit while uploading results and were cut off before the evidence was uploaded.",
        ],
        outro:
          "I evaluated the options with the team and adopted a selective approach: automatic screenshots for every failed test and, for passing tests, only on request. This keeps the evidence that matters while keeping the file volume of each run under control.",
      },
      result: {
        items: [
          "Every failed test is documented with a screenshot showing the exact state of the application when the error occurred.",
          "Faster diagnosis: the team finds where a test failed directly from the report, without having to reproduce it.",
          "In production and demo, screenshots are stored as private, expiring artifacts to protect customer data.",
        ],
        outro: "Next step: agree with the team on a fix for runs that hit the time limit.",
      },
    },
    portfolio: {
      title: "React portfolio",
      subtitle: "This site: designed, built and tested by me with the same quality standards I apply at work.",
      context: "Personal",
      problem: "I needed to present my QA profile clearly to recruiters in Mexico and abroad, on a site that is fast, accessible and easy to maintain.",
      solution: {
        intro: "I built it with React and Vite, keeping content separate from design:",
        items: [
          "Full Spanish and English versions, using the browser language as the initial choice.",
          "Light and dark mode, remembered between visits and with no flicker on load.",
          "Accessibility: semantic HTML, visible focus, labeled form fields and support for the reduced-motion preference.",
          "Contact form powered by EmailJS, with per-field validation and status messages.",
          "End-to-end tests with Playwright on desktop and mobile (contact form, CV download, languages, theme and navigation), run in GitHub Actions on every pull request.",
          "Automated accessibility audit (WCAG 2.1 AA) with axe in every language and theme, and on mobile.",
          "Lighthouse CI with minimums for accessibility, best practices and SEO: if a score drops, the pipeline fails.",
          "A public quality dashboard showing the real results of every CI run, generated by a script with its own unit tests.",
        ],
      },
      result: [
        "A lightweight site, deployed on Vercel, that works well on mobile, tablet and desktop.",
        "All content lives in data files: updating it doesn't require touching the components.",
        "Quality is visible: anyone can open the dashboard and see which tests ran, how long they took and whether anything failed.",
      ],
    },
  },

  education: [
    {
      title: "Software Development Engineering",
      school: "Universidad Ciudadana",
      period: "Expected graduation 2027",
      note: null,
    },
  ],

  // Quality dashboard (/calidad).
  quality: {
    meta: {
      title: "Quality dashboard — Juan Macias",
      description: "Live CI results for Juan Macias's portfolio: E2E tests, accessibility, Lighthouse and run history.",
    },
    eyebrow: "Live quality",
    title: "Quality dashboard",
    lead: "Real results from this portfolio's pipeline. Every push to main runs lint, unit tests, E2E tests on desktop and mobile, an axe accessibility audit and Lighthouse. This is the latest run, unedited.",
    back: "Back to portfolio",
    status: { ok: "Pipeline green", fallo: "Pipeline failing", "sin-datos": "No test results" },
    localRun: "Local run (outside GitHub Actions)",
    run: "Run",
    commit: "Commit",
    branch: "Branch",
    generated: "Generated",
    links: { run: "View in GitHub Actions", e2e: "Playwright report", lighthouse: "Lighthouse report" },
    kpis: {
      label: "Latest run summary",
      tests: "E2E tests",
      passedOf: (p, t) => `${p} of ${t} passed`,
      failed: "Failed",
      failedHint: "still failing after retry",
      flaky: "Flaky",
      flakyHint: "passed only on retry",
      duration: "Suite duration",
      durationHint: (n) => `${n} devices in parallel`,
    },
    lighthouse: {
      title: "Lighthouse",
      lead: "Median of 3 runs against the production build. If a category drops below its minimum, the pipeline fails.",
      categories: { rendimiento: "Performance", accesibilidad: "Accessibility", "buenas-practicas": "Best practices", seo: "SEO" },
      min: (n) => `min ${n}`,
      warnOnly: "warning only",
      below: "below minimum",
      empty: "This run has no Lighthouse results.",
    },
    pipeline: {
      title: "Pipeline",
      lead: "How long each GitHub Actions job took and when it started. Tests and Lighthouse run in parallel.",
      total: "Total",
      steps: (n) => `Show ${n} steps`,
      empty: "The timeline appears when the dashboard is generated in GitHub Actions.",
      startsAt: (s) => `starts at ${s}`,
    },
    tests: {
      title: "Results by test",
      filterLabel: "Filter tests",
      filters: { todas: "All", fallo: "Failed", flaky: "Flaky" },
      search: "Search tests",
      searchPlaceholder: "e.g. form, mobile, WCAG…",
      columns: { test: "Test", device: "Device", status: "Status", duration: "Duration" },
      projects: { escritorio: "Desktop", movil: "Mobile" },
      states: { paso: "Passed", fallo: "Failed", flaky: "Flaky", omitida: "Skipped" },
      attempts: (n) => `${n} attempts`,
      openReport: "Open in report",
      showing: (n, t) => `Showing ${n} of ${t} tests`,
      empty: "No tests match the filter.",
    },
    history: {
      title: "History",
      lead: (n) => `Last ${n} runs on main. Bar height is the E2E suite duration.`,
      chartLabel: "Suite duration per run",
      single: "There is only one run so far; the history grows with every push to main.",
      tableToggle: "View as table",
      columns: { run: "Run", date: "Date", status: "Status", tests: "Tests", flaky: "Flaky", duration: "Duration", a11y: "A11y" },
      states: { ok: "Green", fallo: "Failed", "sin-datos": "No data" },
    },
    loading: "Loading CI results…",
    error: "Couldn't load the CI results.",
    errorHint: "The pipeline may not have published yet. You can also see the runs directly in GitHub Actions.",
    retry: "Retry",
    actionsLink: "Open GitHub Actions",
  },
}

export default en
