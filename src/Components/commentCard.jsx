import React from "react";
import "./commentCard.css";

const CommentCard = ({ comment }) => {
  const formattedDate = new Date(comment.created_at).toLocaleDateString(
    "en-uk",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="comment-card">
      <div className="comment-header">
        <p>@{comment.author}</p>
        <p>{formattedDate}</p>
      </div>
      <div className="comment-body">
        <p>{comment.body}</p>
      </div>
      <p>Votes: {comment.votes}</p>
    </div>
  );
};

export default CommentCard;
