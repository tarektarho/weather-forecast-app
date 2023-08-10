import React from "react"
import { useWeather } from "../../providers/weatherContext"
import DailyDetail from "./DailyDetail"
import Loader from "../common/Loader"
import ForecastData from "../../types/forecastTypes"

const DailyWidget: React.FC = () => {
  const { forecastData } = useWeather()

  if (!forecastData || !forecastData.data) {
    return <Loader />
  }

  if (forecastData.loading || Object.keys(forecastData.data).length === 0) {
    return <Loader />
  }

  const { list: forecastList } = forecastData.data

  return (
    <>
      <h3 className="widget-title" data-testid="daily-widget-title">
        Forecast next 5 days
      </h3>
      <div className="daily-container">
        <div className="daily-wrapper">
          {forecastList &&
            forecastList.map((item: ForecastData["list"]) => (
              <DailyDetail key={item.dt} data={item} />
            ))}
        </div>
      </div>
    </>
  )
}

export default DailyWidget
