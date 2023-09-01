import React from "react"
import { useWeather } from "../../providers/weatherContext"
import DailyDetail from "./DailyDetail"
import ForecastData from "../../types/forecast"
import DailyWidgetSkeleton from "../common/skeletons/DailyWidgetSkeleton"

const DailyWidget: React.FC = () => {
  // Retrieve forecast data from the weather context
  const { forecastData } = useWeather()

  if (!forecastData || !forecastData.data) {
    return <DailyWidgetSkeleton />
  }

  if (forecastData.loading || Object.keys(forecastData.data).length === 0) {
    return <DailyWidgetSkeleton />
  }

  const { list: forecastList } = forecastData.data

  // Render the forecast data if available
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
