import { sleep } from "../utils"
import { API_KEY, STATUS_OK } from "../utils/constants"

/**
 * Fetches data from a specified URL with provided parameters.
 *
 * @param url - The base URL to fetch data from.
 * @param params - The query parameters to include in the URL.
 * @returns A Promise containing the fetched data as JSON response.
 * @throws An error if the fetch or parsing process encounters an issue.
 */
export const fetchData = async (url: string, params: string): Promise<any> => {
  // Construct the full URL with API key and parameters
  const fullUrl = `${url}?${params}&appid=${API_KEY}`

  try {
    // Fetch data from the constructed URL
    const response = await fetch(fullUrl)

    // Parse JSON response regardless of status
    const responseData = await response.json()

    await sleep(100) // Pause for 1 second to ensure synchronized padding in the loading state for the skeletons.

    // Check if the response status is 200 (OK) and return parsed data
    if (response.status === STATUS_OK) {
      return responseData
    }

    // If status is not 200, throw error with parsed response data
    throw responseData
  } catch (error) {
    // Throw an error with the caught error message
    throw error
  }
}
