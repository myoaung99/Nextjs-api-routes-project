import { useRef, useState, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [submitting, setSubmitting] = useState(false);
  const emailInputRef = useRef();

  const notiCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    setSubmitting(true);
    notiCtx.showNotification({
      title: "Newsletter Registration",
      message: "Registrating email",
      status: "pending",
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmitting(false);
        notiCtx.showNotification({
          title: "Newsletter Registration",
          message: "Registered successfully",
          status: "success",
        });
      })
      .catch((error) => {
        notiCtx.showNotification({
          title: "Newsletter Registration",
          message: error.message,
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>{submitting ? "Sending..." : "Register"}</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
