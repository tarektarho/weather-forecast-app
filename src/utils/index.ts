import {
  ERROR_BROWSER_GEOLOCATION_OFF,
  LOCAL_STORAGE_KEY_GPS_POSITION,
  LOCAL_STORAGE_KEY_WELCOME_MODAL,
  URL_PARAM_LAT,
  URL_PARAM_LON,
} from "./constants"

/**
 * Get the day of the month from a UNIX timestamp.
 * @param date - UNIX timestamp.
 * @returns The day of the month.
 */
export const getDay = (date: number): number => new Date(date * 1000).getDate()

/**
 * Get the hour in 12-hour format with time zone conversion.
 * @param date - UNIX timestamp.
 * @returns The formatted time.
 */
export const getHour = (date: number): string =>
  new Date(date * 1000).toLocaleTimeString("en-GB", {
    timeZone: "Europe/Amsterdam", // Todo set the time zone dynimcally from the user current location
  })

/**
 * Get the short name of the month from a UNIX timestamp.
 * @param date - UNIX timestamp.
 * @returns The short name of the month.
 */
export const getMonth = (date: number): string => {
  return new Date(date * 1000).toLocaleString("default", { month: "short" })
}

/**
 * Convert temperature from Kelvin to Fahrenheit.
 * @param k - Temperature in Kelvin.
 * @returns Temperature in Fahrenheit.
 */
export const convertKelvinToFahrenheit = (k: number): number => {
  return Math.trunc((k - 273.15) * 1.8 + 32)
}

/**
 * Convert temperature from Kelvin to Celsius.
 * @param k - Temperature in Kelvin.
 * @returns Temperature in Celsius.
 */
export const convertKelvinToCelsius = (k: number): number => {
  return Math.trunc(k - 273.15)
}

/**
 * Get the URL for a weather icon based on the icon code.
 * @param icon - Icon code.
 * @returns URL of the weather icon.
 */
export const getWeatherIcon = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

/**
 * Save GPS coordinates to local storage.
 * @param lat - Latitude.
 * @param lon - Longitude.
 */
export const savePosition = (lat: number, lon: number) => {
  const position = getLocalStorageItem(LOCAL_STORAGE_KEY_GPS_POSITION)
  const coordinates = { lat, lon }

  if (position) {
    if (position.lat !== lat || position.lon !== lon) {
      setLocalStorageItem(LOCAL_STORAGE_KEY_GPS_POSITION, coordinates)
    }
  } else {
    setLocalStorageItem(LOCAL_STORAGE_KEY_GPS_POSITION, coordinates)
  }
}

/**
 * Set an item in local storage.
 * @param name - Name of the local storage item.
 * @param value - Value to be stored.
 */
export const setLocalStorageItem = (name: string, value: any): void => {
  localStorage.setItem(name, JSON.stringify(value))
}

/**
 * Get an item from local storage.
 * @param name - Name of the local storage item.
 * @returns The stored value or null if not found.
 */
export const getLocalStorageItem = (name: string): any => {
  const data = localStorage.getItem(name)
  if (data) {
    return JSON.parse(data)
  }
  return null
}

/**
 * Reset the app's state and remove URL parameters.
 */
export const resetApp = (): void => {
  window.location.href = window.location.href.split("?")[0] // remove params from URL if any
  setLocalStorageItem(LOCAL_STORAGE_KEY_GPS_POSITION, null)
  setLocalStorageItem(LOCAL_STORAGE_KEY_WELCOME_MODAL, null)
}

/**
 * Copy the app's link with GPS coordinates to clipboard.
 * @returns A promise that resolves when copying is successful.
 */
export const placeLinkIntoClipBoard = (): Promise<void> => {
  const location = getLocalStorageItem(LOCAL_STORAGE_KEY_GPS_POSITION)

  if (location === null) {
    // Handle the case when location is null
    return Promise.reject("Location is not available.")
  }
  const { lat, lon } = location
  const link = `${window.location.href}?${URL_PARAM_LAT}=${lat}&${URL_PARAM_LON}=${lon}`
  return navigator.clipboard.writeText(link)
}

/**
 * Get a URL parameter's value from the current page URL.
 * @param param - URL parameter name.
 * @returns The parameter's value or null if not found.
 */
export const getURLParam = (param: string): string | null => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get(param)
}

/**
 * Get the user's geo position using the browser's geolocation API.
 * @returns A promise that resolves with the latitude and longitude.
 * @throws ERROR_BROWSER_GEOLOCATION_OFF if geolocation is not available.
 */
export const getBrowserGeoPosition = (): Promise<{
  latitude: number
  longitude: number
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(ERROR_BROWSER_GEOLOCATION_OFF)
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        if (latitude !== undefined && longitude !== undefined) {
          return resolve({ latitude, longitude })
        } else {
          return reject("Geolocation position is undefined.")
        }
      },
      (error) => {
        return reject(error)
      },
    )
  })
}
