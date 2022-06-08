import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  // handler function
  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  // handler function
  const addCommentHandler = (data) => {
    fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ id: eventId, ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEventComments(data);
      });
  };

  // helper function
  const setEventComments = (data) => {
    const eventCmt = data.comment.filter(
      (comment) => comment.eventId === eventId
    );
    setComments(eventCmt);
  };

  useEffect(() => {
    fetch("/api/comment")
      .then((response) => response.json())
      .then((data) => {
        if (data.comment.length > 0) {
          setEventComments(data);
        }
      });
  }, []);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
