import React from "react"
import { useWeather } from "../../providers/weatherContext"
import Sunrise from "../../assets/images/sunrise.png"
import Sunset from "../../assets/images/sunset.png"
import Loader from "../common/Loader"
import { getHour } from "../../utils/index"

const AdditionalWidget: React.FC = () => {
  const { weatherData } = useWeather()

  if (!weatherData || !weatherData.data) {
    return <Loader />
  }

  if (weatherData.loading || Object.keys(weatherData.data).length === 0) {
    return <Loader />
  }

  const { sunrise, sunset } = weatherData.data.sys
  return (
    <div className="weather-extra-wrapper my-other-step">
      <h4 className="widget-title">More data from OpenWeather</h4>
      <div className="extra-info-container">
        <div className="widget weather-extra bg-extra1">
          <img src={Sunrise} alt="sunrise" />
          <h4 data-testid="sunrise">{getHour(sunrise)}</h4>
        </div>
        <div className="widget weather-extra bg-extra4 mb-0">
          <img src={Sunset} alt="sunset" />
          <h4 data-testid="sunset">{getHour(sunset)}</h4>
        </div>
      </div>
    </div>
  )
}

export default AdditionalWidget
