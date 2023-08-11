import { ERROR_INVALID_LAT_LON, BASE_URL_WEATHER } from "../utils/constants"
import { fetchData } from "./common"
import AirPollutionData from "../types/airPollutionTypes"

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
