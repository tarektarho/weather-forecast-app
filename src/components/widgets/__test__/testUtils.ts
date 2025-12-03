import { SetStateAction } from "react"
import { WeatherContextValue } from "../../../providers/weatherContext"

export const weatherContextMockedData = {
  forecastData: {
    loading: true,
    data: {},
  },
  weatherData: {
    loading: true,
    data: {},
  },
  airPollutionData: {
    loading: true,
    data: {},
  },
  city: "",
  setCity: (value: SetStateAction<string>): void => {},
  searchByCity: (): void => {},
  copyShareUrl: (): void => {},
  modal: false,
  hideModal: (): void => {},
  error: undefined,
  hideError: (): void => {},
  info: undefined,
  setInfo: (value: SetStateAction<string | undefined>): void => {},
  setError: (value: SetStateAction<string | undefined>): void => {},
}
