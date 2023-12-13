import React, { useState } from "react";


const CommentForm = ({ onAddComment }) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const commentWithUser = {
      username: "grumpy19",
      body: newComment,
    };

    setIsSubmitting(true);

    if (typeof onAddComment === "function") {
        const result = onAddComment(commentWithUser)
        if (result && typeof result.then === "function") {
            result
            .then(() => {
                console.log("success");
              })
              .catch((error) => {
                console.error("Error adding comment:", error);
              })
              .finally(() => {
                setIsSubmitting(false);
                setNewComment("");
              });
            } else {
                console.log("success");
                setIsSubmitting(false);
                setNewComment("");
              }
            } else {
              console.error("onAddComment is not a function");
              setIsSubmitting(false);
            }
          };
    
          const handleKeyPress = (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event)
            }
          }
        

  return (
    <form className="new-comment-form" onSubmit={handleSubmit}>
      <label>
        <textarea
          className="comment-input"
          value={newComment}
          onChange={handleCommentChange}
          onKeyDown={handleKeyPress}
          placeholder="Type your comment here..."
          required
        />
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding Comment..." : "Add Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
