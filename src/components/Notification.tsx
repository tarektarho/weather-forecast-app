import React from "react"
import ErrorIcon from "../assets/images/error.png"
import CloseIcon from "../assets/images/close.png"

// Define the interface for the props received by the Notification component.
interface NotificationProps {
  message: string | undefined // Message to display in the notification.
  hideNotification: () => void // Callback function to hide the notification.
  type: "error" | "info" | "success" // Type of notification (error, info, or success).
}

// The Notification component displays a notification with a message, icon, and close button.
const Notification: React.FC<NotificationProps> = ({
  message,
  hideNotification,
  type,
}) => {
  // Function to render the appropriate icon based on the notification type.
  const renderIcon = () => {
    if (type === "error") {
      return <img src={ErrorIcon} alt={type} data-testid="error-icon" />
    }
    // If the type is not "error", no icon is rendered.
    return
  }

  return (
    <div className={`notification ${type}`} data-testid="notification">
      <div className="notification-message">
        {/* Call the renderIcon function to display the appropriate icon. */}
        {renderIcon()}
        <p>{message}</p> {/* Display the notification message. */}
      </div>
      <div onClick={hideNotification} data-testid="close-icon">
        <img src={CloseIcon} alt="closeIcon" /> {/* Display the close icon. */}
      </div>
    </div>
  )
}

export default Notification
