import React from "react"
import SkeletonElement from "./SkeletonElement"

const AirPollutionWidgetSkeleton: React.FC = () => {
  return (
    <>
      <div className="air-title mb-8">
        <SkeletonElement type="long-title" />
        <SkeletonElement type="title" />
      </div>
      <div className="flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((component, index) => (
          <div className="skeleton air-data" key={index}></div>
        ))}
      </div>
    </>
  )
}

export default AirPollutionWidgetSkeleton
