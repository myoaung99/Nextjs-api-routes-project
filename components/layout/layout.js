import { Fragment } from "react";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";
import { useContext } from "react";
import MainHeader from "./main-header";

function Layout(props) {
  const notiCtx = useContext(NotificationContext);
  const activeNotification = notiCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification ? (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default Layout;
