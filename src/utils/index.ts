import {
  ERROR_BROWSER_GEOLOCATION_OFF,
  LOCAL_STORAGE_KEY_GPS_POSITION,
  LOCAL_STORAGE_KEY_WELCOME_MODAL,
  URL_PARAM_LAT,
  URL_PARAM_LON,
} from "./constants"

export const getDay = (date: number): number => new Date(date * 1000).getDate()

export const getHour = (date: number): string =>
  new Date(date * 1000).toLocaleTimeString("en-US")

export const getMonth = (date: number): string => {
  return new Date(date * 1000).toLocaleString("default", { month: "short" })
}

export const convertKelvinToFahrenheit = (k: number): number => {
  return Math.trunc((k - 273.15) * 1.8 + 32)
}

export const convertKelvinToCelsius = (k: number): number => {
  return Math.trunc(k - 273.15)
}

export const getWeatherIcon = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

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

export const setLocalStorageItem = (name: string, value: any): void => {
  localStorage.setItem(name, JSON.stringify(value))
}

export const getLocalStorageItem = (name: string): any => {
  const data = localStorage.getItem(name)
  if (data) {
    return JSON.parse(data)
  }
  return null
}

export const resetApp = (): void => {
  window.location.href = window.location.href.split("?")[0] // remove params from URL if any
  setLocalStorageItem(LOCAL_STORAGE_KEY_GPS_POSITION, null)
  setLocalStorageItem(LOCAL_STORAGE_KEY_WELCOME_MODAL, null)
}

export const placeLinkIntoClipBoard = (): Promise<void> => {
  const location = getLocalStorageItem(LOCAL_STORAGE_KEY_GPS_POSITION)
  const { lat, lon } = location
  const link = `${window.location.href}?${URL_PARAM_LAT}=${lat}&${URL_PARAM_LON}=${lon}`
  return navigator.clipboard.writeText(link)
}

export const getURLParam = (param: string): string | null => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get(param)
}

export const getBrowserGeoPosition = (): Promise<{
  latitude: number
  longitude: number
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(ERROR_BROWSER_GEOLOCATION_OFF)
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      return resolve({ latitude, longitude })
    })
  })
}
