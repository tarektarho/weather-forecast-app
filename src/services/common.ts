import { API_KEY, STATUS_OK } from "../utils/constants"

// Function to fetch data using provided URL and parameters
export const fetchData = async (url: string, params: string): Promise<any> => {
  // Construct the full URL with API key
  const fullUrl = `${url}?${params}&appid=${API_KEY}`

  try {
    // Fetch data from the constructed URL
    const response = await fetch(fullUrl)

    // Check if the response status is 200 (OK)
    if (response.status === STATUS_OK) {
      // If OK, parse the JSON response and return it
      return await response.json()
    }

    if (!response.status) {
      return response.json()
    }

    // If the status is not 200, parse the JSON response and throw it as an error
    throw await response.json()
  } catch (error) {
    // Catch any errors that occur during the fetch or parsing process
    throw error
  }
}
