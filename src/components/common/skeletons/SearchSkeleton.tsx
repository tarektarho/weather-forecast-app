import React from "react"
import SkeletonElement from "./SkeletonElement"

const SearchSkeleton: React.FC = () => {
  return (
    <div className="search">
      <SkeletonElement type="input" role="search" />
      <SkeletonElement type="button" role="button" />
    </div>
  )
}

export default SearchSkeleton
