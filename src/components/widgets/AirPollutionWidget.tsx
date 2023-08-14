import React from "react"
import { useWeather } from "../../providers/weatherContext"
import Loader from "../common/Loader"

// https://openweathermap.org/api/air-pollution
// Air pollution quality descriptions
const airPollutionQuality: Record<string, string> = {
  "1": "Good Quality",
  "2": "Fair Quality",
  "3": "Moderate Quality",
  "4": "Poor Quality",
  "5": "Very Poor Quality",
}

const AirPollutionWidget: React.FC = () => {
  const { airPollutionData } = useWeather()

  // Check if air pollution data is loading or not available
  if (
    airPollutionData.loading ||
    Object.keys(airPollutionData.data).length === 0
  ) {
    return <Loader />
  }

  // Extract the pollution information from the data
  const pollutionInfo = airPollutionData.data.list[0]
  const { main, components } = pollutionInfo
  const { aqi } = main

  // Calculate the air quality index (AQI) and ensure it's a whole number.
  const quality = Math.trunc(Math.floor(aqi))

  // Array of air pollution components
  const pollutionComponents = [
    { label: "CO", value: components.co },
    { label: "Nh3", value: components.nh3 },
    { label: "NO", value: components.no },
    { label: "No2", value: components.no2 },
    { label: "O3", value: components.o3 },
    { label: "Pm2 5", value: components.pm2_5 },
    { label: "Pm 10", value: components.pm10 },
    { label: "So2", value: components.so2 },
  ]

  return (
    <>
      <div className="air-title">
        <h4 data-testid="airpollution-widget-title">
          Your Current Air Pollution
        </h4>
        <h3>{airPollutionQuality[quality]}</h3>
      </div>
      <div className="flex-wrap">
        {pollutionComponents &&
          pollutionComponents.map((component, index) => (
            <div className="air-data" key={index}>
              <span>{index + 1}</span>
              <h4>{component.label}</h4>
              <p data-testid="airpollution-co">{component.value}</p>
            </div>
          ))}
      </div>
    </>
  )
}

export default AirPollutionWidget
