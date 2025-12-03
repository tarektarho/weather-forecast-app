import React from "react"
import { useWeather } from "../../providers/weatherContext"
import { getWeatherIcon, resetApp, convertKelvinToCelsius } from "../../utils"
import shareIcon from "../../assets/images/share.png"
import resetIcon from "../../assets/images/reset.png"
import CurrentWidgetSkeleton from "../common/skeletons/CurrentWidgetSkeleton"
import WeatherData from "../../types/weather"

const CurrentWidget: React.FC = () => {
  // Get weatherData and copyShareUrl from the weather context
  const { weatherData, copyShareUrl } = useWeather()

  // If weatherData is not available or doesn't contain data, return.
  if (!weatherData || !weatherData.data) {
    return <CurrentWidgetSkeleton />
  }

  // Type guard to check if data is WeatherData
  const isWeatherData = (data: unknown): data is WeatherData => {
    return (
      typeof data === "object" &&
      data !== null &&
      "main" in data &&
      "name" in data &&
      "weather" in data
    )
  }

  // If weatherData is loading or data is not valid, return.
  if (weatherData.loading || !isWeatherData(weatherData.data)) {
    return <CurrentWidgetSkeleton />
  }

  // Destructure necessary information from weatherData
  const fullWeatherInfo = weatherData.data
  const { main, name: location, weather } = fullWeatherInfo
  const { temp, feels_like, humidity, pressure, temp_max, temp_min } = main
  const { main: mainDetail, icon, description } = weather[0]

  // Return the CurrentWidget component with weather information
  return (
    <>
      <div className="widget weather-detail">
        <div className="widget-actions">
          <div className="icons-container" title="Reset" hidden>
            <img
              onClick={resetApp}
              className="current-widget-icon"
              src={resetIcon}
              alt="Reset"
            />
          </div>
          <div className="icons-container" title="Share">
            <img
              onClick={copyShareUrl}
              className="current-widget-icon"
              src={shareIcon}
              alt="Share"
            />
          </div>
        </div>
        <h2 data-testid="city-name">{location}</h2>
        <img className="icon" src={getWeatherIcon(icon)} alt={icon} />
        <p>{description}</p>
        <h3>{convertKelvinToCelsius(temp)}º</h3>
        <p>{mainDetail}</p>
      </div>
      <div className="weather-extra-wrapper">
        <div className="widget weather-extra bg-extra1">
          <p>
            <span>Temp</span> | <span>{convertKelvinToCelsius(temp)}º</span>
          </p>
          <p>
            <span>Feels like</span> |{" "}
            <span>{convertKelvinToCelsius(feels_like)}º</span>
          </p>
        </div>
        <div className="widget weather-extra bg-extra2">
          <p>
            <span>Humidity</span> | <span>{humidity}%</span>
          </p>
          <p>
            <span>Pressure</span> | <span>{pressure}</span>
          </p>
        </div>
        <div className="widget weather-extra bg-extra3">
          <p>
            <span>Temp max</span> |{" "}
            <span>{convertKelvinToCelsius(temp_max)}º</span>
          </p>
          <p>
            <span>Temp min</span> |{" "}
            <span>{convertKelvinToCelsius(temp_min)}º</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default CurrentWidget
