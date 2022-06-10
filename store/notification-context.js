import React, { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (activeNotification) {
      if (
        activeNotification.status === "error" ||
        activeNotification.status === "success"
      ) {
        const timer = setTimeout(() => {
          hideNotificationHandler();
        }, 3000);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
