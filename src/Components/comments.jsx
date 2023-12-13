import React from "react";
import CommentCard from "./commentCard";

const Comments = ({ comments }) => {
  const hasComments = Object.keys(comments).some((commentId) => {
    return comments[commentId].length > 0;
  });

  return (
    <div>
      {hasComments ? (
        <div className="comment-card-container">
          <ul className="comment-card-list">
            {Object.keys(comments).map((commentId) => {
              const commentArray = comments[commentId];
              return commentArray.map((comment) => (
                <li key={comment.comment_id}>
                  <CommentCard comment={comment} />
                </li>
              ));
            })}
          </ul>
        </div>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default Comments;
