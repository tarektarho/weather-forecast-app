import React from "react"
import Dashboard from "./components/Dashboard"
import { WeatherProvider } from "./providers/weatherProvider"

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <Dashboard />
    </WeatherProvider>
  )
}

export default App
