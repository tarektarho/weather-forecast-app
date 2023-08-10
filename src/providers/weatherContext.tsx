import { createContext, useContext } from "react"

export interface WeatherContextValue {
  city: string
  setCity: React.Dispatch<React.SetStateAction<string>>
  searchByCity: () => void
  weatherData: any
  forecastData: any
  airPollutionData: any
  copyShareUrl: () => void
  modal: boolean
  hideModal: () => void
  error: any
  hideError: () => void
  info: any
  setInfo: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const WeatherContext = createContext<WeatherContextValue | undefined>(
  undefined,
)
export const ERROR_CONTEXT_OUTSIDE =
  "Weather context cannot be outside of WeatherProvider"

// Custom hook
export const useWeather = (): WeatherContextValue => {
  const contextValue = useContext(WeatherContext)

  if (contextValue === undefined) {
    throw new Error(ERROR_CONTEXT_OUTSIDE)
  }

  return contextValue
}
