import { useRef, useState } from "react";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [submitting, setSubmitting] = useState(false);
  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    setSubmitting(true);
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
