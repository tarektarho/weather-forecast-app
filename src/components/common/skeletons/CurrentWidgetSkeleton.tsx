import React from "react"
import SkeletonElement from "./SkeletonElement"

const CurrentWidgetSkeleton: React.FC = () => {
  return (
    <>
      <SkeletonElement
        type="widget weather-detail"
        role="current-widget-skeleton"
      />
      <div className="weather-extra-wrapper">
        <SkeletonElement type="widget weather-extra bg-extra1" />
        <SkeletonElement type="widget weather-extra bg-extra2" />
        <SkeletonElement type="widget weather-extra bg-extra3" />
      </div>
    </>
  )
}

export default CurrentWidgetSkeleton
