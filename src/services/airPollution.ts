import {
  ERROR_INVALID_LAT_LON,
  BASE_URL_WEATHER,
  ERROR_INVALID_CITY,
  GEO_URL,
} from "../utils/constants"
import { fetchData } from "./common"
import AirPollutionData from "../types/airPollution"

/**
 * Fetches air pollution data for a specific latitude and longitude.
 *
 * @param lat_ - The latitude of the location.
 * @param lon_ - The longitude of the location.
 * @returns A Promise containing the fetched air pollution data.
 * @throws An error if the latitude or longitude is missing or invalid.
 */
export const getAirPollutionByLatLon = async (
  lat_: number,
  lon_: number,
): Promise<AirPollutionData> => {
  // Validate if lat or lon is set and throw error otherwise
  if (!lat_ || !lon_) {
    throw new Error(ERROR_INVALID_LAT_LON)
  }

  // Construct the base URL for air pollution data
  const baseUrl = `${BASE_URL_WEATHER}/air_pollution`

  // Construct query parameters for the URL
  const params = `lat=${lat_}&lon=${lon_}`

  // Fetch air pollution data using common fetchData function
  return (await fetchData(baseUrl, params)) as Promise<AirPollutionData>
}

/**
 * Fetch air pollution data for a specific city.
 *
 * @param {string} city - The name of the city to retrieve air pollution data for.
 * @returns {Promise<AirPollutionData>} A Promise containing air pollution data for the city.
 * @throws {Error} Throws an error if the city name is empty or invalid.
 */
export const getAirPollutionByCity = async (
  city: string,
): Promise<AirPollutionData> => {
  // Trim leading and trailing spaces from the city name
  const trimmedCity = city.trim()

  // Check if the city name is empty or contains only spaces
  if (!trimmedCity) {
    throw new Error(ERROR_INVALID_CITY)
  }

  // Encode the city name for use in the query parameters
  const encodedCity = encodeURIComponent(trimmedCity)

  // Build the query parameters
  const params = `q=${encodedCity}&limit=1`

  // Fetch geolocation data for the city
  const [firstResult] = await fetchData(GEO_URL, params)

  // Check if no geolocation data was found for the city
  if (!firstResult) {
    throw new Error(ERROR_INVALID_CITY)
  }

  // Retrieve air pollution data using the obtained latitude and longitude
  return getAirPollutionByLatLon(firstResult.lat, firstResult.lon)
}
