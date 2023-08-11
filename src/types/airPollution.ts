interface ComponentsInfo {
  co: number
  no: number
  no2: number
  o3: number
  so2: number
  pm2_5: number
  pm10: number
  nh3: number
}

interface AirQualityInfo {
  aqi: number
}

interface AirPollutionItem {
  main: AirQualityInfo
  components: ComponentsInfo
  dt: number
}

interface AirPollutionData {
  coord: {
    lon: number
    lat: number
  }
  list: AirPollutionItem
}

export default AirPollutionData
