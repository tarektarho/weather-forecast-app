import {
  BASE_URL_WEATHER,
  ERROR_INVALID_LAT_LON,
  ERROR_INVALID_CITY,
} from "../utils/constants"
import WeatherData from "../types/weather"
import { fetchData } from "./common"

/**
 * Fetches weather data for a specific city.
 *
 * @param city_ - The name of the city for which weather data is to be fetched.
 * @returns A Promise containing the weather data for the specified city.
 * @throws An error if the city name is empty or invalid.
 */
export const getWeatherByCity = async (city_: string): Promise<WeatherData> => {
  // Check if city name is empty or contains only spaces
  if (!city_ || city_ === "" || city_.trim() === "") {
    throw new Error(ERROR_INVALID_CITY)
  }

  // Build the base URL and query parameters
  const baseUrl = BASE_URL_WEATHER + "/weather"
  const params = `q=${encodeURIComponent(city_)}`

  // Fetch and return weather data using common fetchData function
  return (await fetchData(baseUrl, params)) as Promise<WeatherData>
}

/**
 * Fetches weather data for a specific latitude and longitude.
 *
 * @param lat_ - The latitude coordinate.
 * @param lon_ - The longitude coordinate.
 * @returns A Promise containing the weather data for the specified coordinates.
 * @throws An error if the latitude or longitude is missing or invalid.
 */
export const getWeatherByLatLon = async (
  lat_: number,
  lon_: number,
): Promise<WeatherData> => {
  // Check if latitude or longitude is missing
  if (!lat_ || !lon_) {
    throw new Error(ERROR_INVALID_LAT_LON)
  }

  // Build the base URL and query parameters
  const baseUrl = BASE_URL_WEATHER + "/weather"
  const params = `lat=${lat_}&lon=${lon_}`

  // Fetch and return weather data using common fetchData function
  return (await fetchData(baseUrl, params)) as Promise<WeatherData>
}
