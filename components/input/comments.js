import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // handler function
  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  // handler function
  const addCommentHandler = (data) => {
    setIsLoading(true);
    fetch(`/api/comment/` + eventId, {
      method: "POST",
      body: JSON.stringify({ ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      });
  };

  // helper function
  const setEventComment = (comments) => {
    const eventCmt = comments.filter((comment) => comment.eventId === eventId);
    setComments(eventCmt);
  };

  // get comments to display
  useEffect(() => {
    console.log("in use effect");
    fetch("/api/comment/" + eventId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.comments.length > 0) {
          setEventComment(data.comments);
        }
      });
  }, []);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <NewComment isLoading={isLoading} onAddComment={addCommentHandler} />
      )}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
