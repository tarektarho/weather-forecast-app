import React from "react"
import MapImg from "../assets/images/map.jpeg"
import packageJson from "../../package.json"

// Define the interface for the props received by the Modal component.
interface ModalProps {
  hideModal: () => void // Callback function to hide the modal.
}

// The Modal component displays information about the WeatherForecastApp and its features.
const Modal: React.FC<ModalProps> = ({ hideModal }) => {
  // List of features provided by the app.
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
          <h2>WeatherForecastApp</h2>
          <p>Version {packageJson.version}</p>
        </div>

        <div className="modal-content">
          <div className="modal-body">
            <h3>App Features</h3>
            <ul>
              {/* Map over the appFeatures array and display each feature as a list item. */}
              {appFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          {/* Display an image of a map using the imported MapImg. */}
          <img src={MapImg} alt="map" />
        </div>

        <div className="modal-button">
          {/* Attach the hideModal function to the "Continue" button to close the modal. */}
          <button onClick={hideModal} data-testid="hide-modal-btn">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
