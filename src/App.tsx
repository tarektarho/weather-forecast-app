import React from "react"
import Dashboard from "./components/Dashboard"
import { WeatherProvider } from "./providers/weatherProvider"
import ErrorBoundary from "./components/ErrorBoundary"

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <WeatherProvider>
        <Dashboard />
      </WeatherProvider>
    </ErrorBoundary>
  )
}

export default App
