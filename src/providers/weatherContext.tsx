import { createContext, useContext } from "react"
import WeatherData from "../types/weatherTypes"
import ForecastData from "../types/forecastTypes"
import AirPollutionData from "../types/airPollution"

/**
 * Interface defining the shape of the context value used in the WeatherProvider.
 */
export interface WeatherContextValue {
  city: string
  setCity: React.Dispatch<React.SetStateAction<string>>
  searchByCity: () => void
  weatherData: WeatherData | any | undefined // Data for weather information
  forecastData: ForecastData | any | undefined // Data for forecast information
  airPollutionData: AirPollutionData | any | undefined // Data for air pollution information
  copyShareUrl: () => void
  modal: boolean
  hideModal: () => void
  error: string | undefined
  hideError: () => void
  info: string | undefined
  setInfo: React.Dispatch<React.SetStateAction<string | undefined>>
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
