import React from "react"
import { useWeather } from "../../providers/weatherContext"
import Sunrise from "../../assets/images/day-image.png"
import Sunset from "../../assets/images/night-image.png"
import { getHour } from "../../utils/index"
import AdditionalWidgetSkeleton from "../common/skeletons/AdditionalWidgetSkeleton"

const AdditionalWidget: React.FC = () => {
  const { weatherData } = useWeather()

  // Check if weather data is not available
  if (!weatherData || !weatherData.data) {
    return <AdditionalWidgetSkeleton />
  }

  // Check if weather data is loading or not available
  if (weatherData.loading || Object.keys(weatherData.data).length === 0) {
    return <AdditionalWidgetSkeleton />
  }

  // Extract sunrise and sunset times from weather data
  const { sunrise, sunset } = weatherData.data.sys

  return (
    <div className="weather-extra-wrapper my-other-step">
      {/* Widget title */}
      <h4 className="widget-title">More data from OpenWeather</h4>
      <div className="extra-info-container">
        {/* Sunrise information */}
        <div className="widget weather-extra bg-extra1">
          <img src={Sunrise} alt="sunrise" />
          {/* Display the sunrise time */}
          <h4 data-testid="sunrise">{getHour(sunrise)}</h4>
        </div>
        {/* Sunset information */}
        <div className="widget weather-extra bg-extra4 mb-0">
          <img src={Sunset} alt="sunset" />
          {/* Display the sunset time */}
          <h4 data-testid="sunset">{getHour(sunset)}</h4>
        </div>
      </div>
    </div>
  )
}

export default AdditionalWidget
