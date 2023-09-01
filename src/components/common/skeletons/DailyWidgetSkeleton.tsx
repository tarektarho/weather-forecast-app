import React from "react"
import SkeletonElement from "./SkeletonElement"
import DailyDetailSkeleton from "./DailyDetailSkeleton"

const DailyWidgetSkeleton: React.FC = () => {
  return (
    <>
      <SkeletonElement type="forecast-title" role="daily-widget-skeleton" />
      <div className="daily-container">
        <div className="daily-wrapper">
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <DailyDetailSkeleton key={index} />
          ))}
        </div>
      </div>
    </>
  )
}

export default DailyWidgetSkeleton
