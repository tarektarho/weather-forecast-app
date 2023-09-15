export const API_KEY: string = import.meta.env.VITE_WEATHER_API_KEY
export const BASE_URL_WEATHER: string =
  "https://api.openweathermap.org/data/2.5"

export const GEO_URL: string = "https://api.openweathermap.org/geo/1.0/direct"

export const URL_PARAM_LAT: string = "lat"
export const URL_PARAM_LON: string = "lon"

export const LOCAL_STORAGE_KEY_WELCOME_MODAL: string = "welcomeModal"
export const LOCAL_STORAGE_KEY_GPS_POSITION: string = "gps_position"

export const MESSAGE_URL_COPIED: string = "URL was copied to clipboard"

export const ERROR_BROWSER_GEOLOCATION_OFF: string =
  "It seems like your browser does not support HTML5 geolocation. Please install a different browser and enable JavaScript"
export const ERROR_INVALID_LAT_LON: string =
  "Invalid latitude or longitude, make sure your browser supports JavaScript and HTML"
export const ERROR_INVALID_CITY: string = "Invalid city. Try with another city"

export const STATUS_OK: number = 200
export const STATUS_CREATED: number = 201
export const STATUS_NO_CONTENT: number = 204
export const STATUS_BAD_REQUEST: number = 400
export const STATUS_UNAUTHORIZED: number = 401
export const STATUS_FORBIDDEN: number = 403
export const STATUS_NOT_FOUND: number = 404
export const STATUS_INTERNAL_SERVER_ERROR: number = 500
