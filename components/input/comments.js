import { useEffect, useState, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const notiCtx = useContext(NotificationContext);

  // handler function
  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  // handler function
  const addCommentHandler = (data) => {
    setIsLoading(true);
    notiCtx.showNotification({
      title: "Commenting",
      message: "Adding your comment to database.",
      status: "pending",
    });
    fetch(`/api/comment/` + eventId, {
      method: "POST",
      body: JSON.stringify({ ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json();
        }

        throw new Error(
          response.statusText || "Something went wrong on commenting"
        );
      })
      .then((data) => {
        setIsLoading(false);
        notiCtx.showNotification({
          title: "Success",
          message: "Succfully added your comment.",
          status: "success",
        });
      });
  };

  // helper function
  const setEventComment = (comments) => {
    const eventCmt = comments.filter((comment) => comment.eventId === eventId);
    setComments(eventCmt);
  };

  // get comments to display
  useEffect(() => {
    fetch("/api/comment/" + eventId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.comments && data.comments.length > 0) {
          setEventComment(data.comments);
        }
      });
  }, [isLoading]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <NewComment isLoading={isLoading} onAddComment={addCommentHandler} />
      )}
      {showComments && <CommentList isLoading={isLoading} items={comments} />}
    </section>
  );
}

export default Comments;
