import {
  BASE_URL_WEATHER,
  ERROR_INVALID_LAT_LON,
  ERROR_INVALID_CITY,
} from "../utils/constants"
import WeatherData from "../types/weatherTypes"
import { fetchData } from "./common"

// Function to fetch weather data for a specific city
export const getWeatherByCity = async (
  city_: string,
): Promise<WeatherData | {}> => {
  if (!city_ || city_ === "" || city_ === " ") {
    const error = { message: ERROR_INVALID_CITY }
    throw error
  }
  const baseUrl = BASE_URL_WEATHER + "/weather"
  const params = `q=${city_}`
  return await fetchData(baseUrl, params)
}

export const getWeatherByLatLon = async (
  lat_: number,
  lon_: number,
): Promise<WeatherData | {}> => {
  if (!lat_ || !lon_) {
    const error = { message: ERROR_INVALID_LAT_LON }
    throw error
  }

  const baseUrl = BASE_URL_WEATHER + "/weather"
  const params = `lat=${lat_}&lon=${lon_}`
  return await fetchData(baseUrl, params)
}
