import React, { useState } from "react";
import "./commentsDesign.css"

const CommentCard = ({ comment, onDeleteComment, signedInUser }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const formattedDate = new Date(comment.created_at).toLocaleDateString(
    "en-uk",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleDelete = () => {
    setIsDeleting(true);
    onDeleteComment(comment.comment_id);
  }

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
      {signedInUser && signedInUser.username === comment.author && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );
};

export default CommentCard;
