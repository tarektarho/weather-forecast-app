import { fetchData } from "./common"
import ForecastData from "../types/forecastTypes"
import {
  ERROR_INVALID_LAT_LON,
  ERROR_INVALID_CITY,
  BASE_URL_WEATHER,
} from "../utils/constants"

export const getForecastByCity = async (
  city_: string,
): Promise<ForecastData | {}> => {
  if (!city_ || city_ === "" || city_ === " ") {
    throw new Error(ERROR_INVALID_CITY)
  }
  const baseUrl = BASE_URL_WEATHER + "/forecast"
  const params = `q=${city_}`
  return await fetchData(baseUrl, params)
}

export const getForecastByLatLon = async (
  lat_: number,
  lon_: number,
): Promise<ForecastData | {}> => {
  // Validate if lat or lon is set and throw error otherwise
  if (!lat_ || !lon_) {
    const error = { message: ERROR_INVALID_LAT_LON }
    throw error
  }
  const baseUrl = BASE_URL_WEATHER + "/forecast"
  const params = `lat=${lat_}&lon=${lon_}`
  return await fetchData(baseUrl, params)
}
