import React, { createContext, useContext, Dispatch } from "react"
import WeatherData from "../types/weather"
import ForecastData from "../types/forecast"
import AirPollutionData from "../types/airPollution"

/**
 * Redux state wrappers for data with loading and error states
 */
export interface WeatherState {
  loading: boolean
  error?: string | boolean
  data: WeatherData | {}
}

export interface ForecastState {
  loading: boolean
  error?: string
  data: ForecastData | {}
}

export interface AirPollutionState {
  loading: boolean
  error?: string
  data: AirPollutionData | {}
}

/**
 * Interface defining the shape of the context value used in the WeatherProvider.
 */
export interface WeatherContextValue {
  city: string
  setCity: React.Dispatch<React.SetStateAction<string>>
  searchByCity: () => void
  weatherData: WeatherState // Data for weather information with loading state
  forecastData: ForecastState // Data for forecast information with loading state
  airPollutionData: AirPollutionState | undefined // Data for air pollution information with loading state
  copyShareUrl: () => void
  modal: boolean
  hideModal: () => void
  error: string | undefined
  hideError: () => void
  info: string | undefined
  setInfo: Dispatch<React.SetStateAction<string | undefined>>
  setError: Dispatch<React.SetStateAction<string | undefined>>
}

/**
 * Create a context for providing Weather-related data and actions to components.
 */
export const WeatherContext = createContext<WeatherContextValue | undefined>(
  undefined,
)
export const ERROR_CONTEXT_OUTSIDE =
  "Weather context cannot be outside of WeatherProvider"

// Custom hook to consume the Weather context in components
export const useWeather = (): WeatherContextValue => {
  const contextValue = useContext(WeatherContext)

  // Throw an error if the hook is used outside the WeatherProvider
  if (contextValue === undefined) {
    throw new Error(ERROR_CONTEXT_OUTSIDE)
  }

  return contextValue
}
