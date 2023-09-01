import React from "react"
import "./Skeleton.scss"

interface SkeletonProps {
  type: string
  role?: string
}

const SkeletonElement: React.FC<SkeletonProps> = ({ type, role }) => {
  const classes = `skeleton ${type}`

  return (
    <div data-testid="skeleton-test-id" className={classes} role={role}></div>
  )
}

export default SkeletonElement
