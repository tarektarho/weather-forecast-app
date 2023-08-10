import React from "react"
import ErrorIcon from "../assets/images/error.png"
import CloseIcon from "../assets/images/close.png"

interface NotificationProps {
  message: string
  hideNotification: () => void
  type: "error" | "info" | "success"
}

const Notification: React.FC<NotificationProps> = ({
  message,
  hideNotification,
  type,
}) => {
  return (
    <div className={`notification ${type}`} data-testid="notification">
      <div className="notification-message">
        {type === "error" && (
          <img src={ErrorIcon} alt={type} data-testid="error-icon" />
        )}
        <p>{message}</p>
      </div>
      <div onClick={() => hideNotification()} data-testid="close-icon">
        <img src={CloseIcon} alt="closeIcon" />
      </div>
    </div>
  )
}

export default Notification
