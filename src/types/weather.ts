interface Coord {
  lon: number
  lat: number
}

interface WeatherInfo {
  id: number
  main: string
  description: string
  icon: string
}

interface MainInfo {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface WindInfo {
  speed: number
  deg: number
  gust: number
}

interface CloudsInfo {
  all: number
}

interface SysInfo {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

interface WeatherData {
  coord: Coord
  weather: WeatherInfo[]
  base: string
  main: MainInfo
  visibility: number
  wind: WindInfo
  clouds: CloudsInfo
  dt: number
  sys: SysInfo
  timezone: number
  id: number
  name: string
  cod: number
}

export default WeatherData
