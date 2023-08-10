interface MainInfo {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}

interface WeatherInfo {
  id: number
  main: string
  description: string
  icon: string
}

interface CloudsInfo {
  all: number
}

interface WindInfo {
  speed: number
  deg: number
  gust: number
}

interface SysInfo {
  pod: string
}

interface ForecastItem {
  dt: number
  main: MainInfo
  weather: WeatherInfo[]
  clouds: CloudsInfo
  wind: WindInfo
  visibility: number
  pop: number
  sys: SysInfo
  dt_txt: string
}

interface ForecastData {
  cod: string
  message: number
  cnt: number
  list: ForecastItem
}

export default ForecastData
