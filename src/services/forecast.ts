import { fetchData } from "./common"
import ForecastData from "../types/forecast"
import {
  ERROR_INVALID_LAT_LON,
  ERROR_INVALID_CITY,
  BASE_URL_WEATHER,
} from "../utils/constants"

/**
 * Fetches forecast data for a specific city.
 *
 * @param city_ - The name of the city for which forecast data is to be fetched.
 * @returns A Promise containing the forecast data for the specified city.
 * @throws An error if the city name is empty or invalid.
 */
export const getForecastByCity = async (
  city_: string,
): Promise<ForecastData> => {
  // Check if city name is empty or contains only spaces
  if (!city_ || city_ === "" || city_.trim() === "") {
    throw new Error(ERROR_INVALID_CITY)
  }

  // Build the base URL and query parameters
  const baseUrl = BASE_URL_WEATHER + "/forecast"
  const params = `q=${city_}`

  // Fetch and return forecast data using common fetchData function
  return (await fetchData(baseUrl, params)) as Promise<ForecastData>
}

/**
 * Fetches forecast data for a specific latitude and longitude.
 *
 * @param lat_ - The latitude coordinate.
 * @param lon_ - The longitude coordinate.
 * @returns A Promise containing the forecast data for the specified coordinates.
 * @throws An error if the latitude or longitude is missing.
 */
export const getForecastByLatLon = async (
  lat_: number,
  lon_: number,
): Promise<ForecastData> => {
  // Validate if latitude or longitude is missing and throw error otherwise
  if (!lat_ || !lon_) {
    const error = { message: ERROR_INVALID_LAT_LON }
    throw error
  }

  // Build the base URL and query parameters
  const baseUrl = BASE_URL_WEATHER + "/forecast"
  const params = `lat=${lat_}&lon=${lon_}`

  // Fetch and return forecast data using common fetchData function
  return (await fetchData(baseUrl, params)) as Promise<ForecastData>
}
