import React from "react"
import "../styles/Dashboard.scss"
import { LOCAL_STORAGE_KEY_WELCOME_MODAL } from "../utils/constants"
import { useWeather } from "../providers/weatherContext"
import CurrentWidget from "./widgets/CurrentWidget"
import DailyWidget from "./widgets/DailyWidget"
import AdditionalWidget from "./widgets/AdditionalWidget"
import AirPollutionWidget from "./widgets/AirPollutionWidget"
import Notification from "./Notification"
import Search from "./Search"
import Modal from "./Modal"
import { getLocalStorageItem } from "../utils"
import SearchSkeleton from "./common/skeletons/SearchSkeleton"
import SkeletonElement from "./common/skeletons/SkeletonElement"

const Dashboard: React.FC = () => {
  // Fetch necessary data and functions from the WeatherContext
  const { modal, hideModal, weatherData, error, hideError, info, setInfo } =
    useWeather()

  // Render an error notification if there's an error message
  const renderErrorIfAny = () => {
    const currentError = weatherData?.error || error
    if (currentError) {
      return (
        <Notification
          message={currentError}
          hideNotification={hideError}
          type="error"
        />
      )
    }
  }

  // Render an info notification if there's an info message
  const renderNotificationIfAny = () => {
    if (info) {
      return (
        <Notification
          message={info}
          hideNotification={() => setInfo(undefined)}
          type="info"
        />
      )
    }
  }

  // Render the welcome modal if it's required
  const renderModalIfNeeded = () => {
    if (!modal) {
      return
    }

    const welcomeModal = getLocalStorageItem(LOCAL_STORAGE_KEY_WELCOME_MODAL)
    if (!welcomeModal) {
      return <Modal hideModal={hideModal} />
    }
  }

  return (
    <div className="main-container" data-testid="main-container">
      <div className="main-wrapper">
        <div className="main-content">
          <div className="main-title">
            <Search />
            <div className="title">
              <h1>WeatherApp</h1>
            </div>
          </div>
          {/* Forecast 5 days */}
          <DailyWidget />
          <div className="flex-wrapper">
            {/* More data from OpenWeather */}
            <div className="flex-item widget">
              <AdditionalWidget />
            </div>
            {/* AirPollution */}
            <div className="flex-item widget">
              <AirPollutionWidget />
            </div>
          </div>
        </div>
        {/* Current weather detail */}
        <div className="detail-content">
          <CurrentWidget />
        </div>
      </div>

      {renderErrorIfAny()}
      {renderModalIfNeeded()}
      {renderNotificationIfAny()}
    </div>
  )
}

export default Dashboard
