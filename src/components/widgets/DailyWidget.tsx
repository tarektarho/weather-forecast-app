import React from "react"
import { useWeather } from "../../providers/weatherContext"
import DailyDetail from "./DailyDetail"
import ForecastData, { ForecastItem } from "../../types/forecast"
import DailyWidgetSkeleton from "../common/skeletons/DailyWidgetSkeleton"

const DailyWidget: React.FC = () => {
  // Retrieve forecast data from the weather context
  const { forecastData } = useWeather()

  if (!forecastData || !forecastData.data) {
    return <DailyWidgetSkeleton />
  }

  // Type guard to check if data is ForecastData
  const isForecastData = (data: unknown): data is ForecastData => {
    return (
      typeof data === "object" &&
      data !== null &&
      "list" in data &&
      Array.isArray((data as ForecastData).list)
    )
  }

  if (
    forecastData.loading ||
    !isForecastData(forecastData.data) ||
    Object.keys(forecastData.data).length === 0
  ) {
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
            forecastList.map((item: ForecastItem) => (
              <DailyDetail key={item.dt} data={item} />
            ))}
        </div>
      </div>
    </>
  )
}

export default DailyWidget
