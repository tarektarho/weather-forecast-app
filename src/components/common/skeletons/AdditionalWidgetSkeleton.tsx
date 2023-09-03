import React from "react"
import SkeletonElement from "./SkeletonElement"

const AdditionalWidgetSkeleton: React.FC = () => {
  return (
    <div className="weather-extra-wrapper my-other-step">
      {/* Widget title */}
      <SkeletonElement type="long-title" />
      <div className="extra-info-container">
        {/* Sunrise information */}
        <SkeletonElement type="skeleton widget weather-extra bg-extra4" />
        {/* Sunset information */}
        <SkeletonElement type="skeleton widget weather-extra bg-extra4 mb-0" />
      </div>
    </div>
  )
}

export default AdditionalWidgetSkeleton
