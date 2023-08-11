import React from "react"
import MapImg from "../assets/images/map.jpeg"

interface ModalProps {
  hideModal: () => void
}

const Modal: React.FC<ModalProps> = ({ hideModal }) => {
  const appFeatures = [
    "Get real-time weather with Geolocation.",
    "Search weather by city.",
    "Forecast for 5 days / 3 hours.",
    "Air Pollution from Geolocation.",
    "Share current location weather with friends.",
  ]

  return (
    <div className="modal-container" data-testid="modal-container">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2>WeatherApp</h2>
          <p>Version 1.0.0</p>
        </div>

        <div className="modal-content">
          <div className="modal-body">
            <h3>App Features</h3>
            <ul>
              {appFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <img src={MapImg} alt="map" />
        </div>

        <div className="modal-button">
          <button onClick={hideModal} data-testid="hide-modal-btn">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
