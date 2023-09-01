import React from "react"
import SkeletonElement from "./SkeletonElement"

const AdditionalWidgetSkeleton: React.FC = () => {
  return (
    <div className="weather-extra-wrapper my-other-step">
      {/* Widget title */}
      <SkeletonElement type="long-title" />
      <div className="extra-info-container">
        {/* Sunrise information */}
        <div className="skeleton widget weather-extra bg-extra1">
          <SkeletonElement type="icon-small" />
          {/* Display the sunrise time */}
          <SkeletonElement type="long-text" />
        </div>
        {/* Sunset information */}
        <div className="skeleton widget weather-extra bg-extra4 mb-0">
          <SkeletonElement type="icon-small" />
          {/* Display the sunset time */}
          <SkeletonElement type="long-text" />
        </div>
      </div>
    </div>
  )
}

export default AdditionalWidgetSkeleton
