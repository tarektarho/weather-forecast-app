import React from "react"
import { Puff } from "react-loader-spinner"

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#66BB6A"
        ariaLabel="puff-loading"
        visible={true}
      />
    </div>
  )
}

export default Loader
