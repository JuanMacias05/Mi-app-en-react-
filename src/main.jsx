import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import LanguageProvider from "./i18n/LanguageProvider.jsx"
import { QUALITY_PATH } from "./data/profile"
import "./index.css"

// Sin router: el sitio solo tiene dos páginas (portafolio y panel de calidad).
const page = window.location.pathname.replace(/\/+$/, "") === QUALITY_PATH ? "calidad" : "inicio"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider page={page}>
      <App page={page} />
    </LanguageProvider>
  </React.StrictMode>
)
