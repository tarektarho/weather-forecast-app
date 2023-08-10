import React from "react"
import ForecastItem from "../../types/forecastTypes"
import {
  convertKelvinToCelsius,
  getDay,
  getMonth,
  getHour,
  getWeatherIcon,
} from "../../utils/index"

interface DailyDetailProps {
  data: ForecastItem["list"] | null
}

const DailyDetail: React.FC<DailyDetailProps> = ({ data }) => {
  if (!data) {
    return null
  }

  const { dt, clouds, main, weather } = data
  return (
    <div className="widget daily-item" data-testid="daily-item">
      <p>
        {getMonth(dt)} {getDay(dt)}
      </p>
      <p>{getHour(dt)}</p>
      <img className="icon" src={getWeatherIcon(weather[0].icon)} alt="" />
      <h3>{convertKelvinToCelsius(main.temp)}º</h3>
      <p>Clouds | {clouds.all}%</p>
      <p data-testid="daily-description">{weather[0].description}</p>
    </div>
  )
}

export default DailyDetail
