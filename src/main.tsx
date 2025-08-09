import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "../src/store/store"
import App from "./App"
import "./styles/index.css"

const container = document.getElementById("root")
if (!container) throw new Error("Root element not found")

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
