import React from "react";
import CommentCard from "./commentCard";

const Comments = ({ comments }) => {
  return (
    <div>
      <h2 className="comments-header">Comments</h2>
      <div className="comment-card-container">
        <ul className="comment-card-list">
          {Object.keys(comments).map((commentId) => {
            const commentArray = comments[commentId];
            return commentArray.map((comment) => (
              <li key={comment.comment_id}>
                <CommentCard comment={comment}/>
              </li>
            ));
          })}
        </ul>
      </div>
    </div>
  );
};

export default Comments;
