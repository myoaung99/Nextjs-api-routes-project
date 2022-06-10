import { useRef, useState } from "react";
import classes from "./new-comment.module.css";

function NewComment(props) {
  // form valdity
  const [isInvalid, setIsInvalid] = useState(false);

  // ref
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  function sendCommentHandler(event) {
    event.preventDefault();

    // extract ref value
    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    // form validation
    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    // props lifting
    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });

    // form clean up
    emailInputRef.current.value = "";
    nameInputRef.current.value = "";
    commentInputRef.current.value = "";
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows="5" ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button className={classes.btn}>
        {props.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default NewComment;
