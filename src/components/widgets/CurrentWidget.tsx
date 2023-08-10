import React from "react"
import { useWeather } from "../../providers/weatherContext"
import { getWeatherIcon, resetApp, convertKelvinToCelsius } from "../../utils"
import Loader from "../common/Loader"
import shareIcon from "../../assets/images/share-icon.png"
import resetIcon from "../../assets/images/reset.png"

const CurrentWidget: React.FC = () => {
  const { weatherData, copyShareUrl } = useWeather()

  if (!weatherData || !weatherData.data) {
    return <Loader />
  }

  if (weatherData.loading || Object.keys(weatherData.data).length === 0) {
    return <Loader />
  }

  const fullWeatherInfo = weatherData.data
  const { main, name: location, weather } = fullWeatherInfo
  const { temp, feels_like, humidity, pressure, temp_max, temp_min } = main
  const { main: mainDetail, icon, description } = weather[0]

  return (
    <>
      <div className="widget weather-detail">
        <div className="widget-actions">
          <div className="icons-container" title="Reset">
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
