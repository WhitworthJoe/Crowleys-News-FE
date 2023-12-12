import React, { useState } from "react";
import { downVoteArticle, upVoteArticle } from "../api";

const VoteButtons = ({ articleId, onVote, selectedArticle }) => {
  const [voteType, setVoteType] = useState(null);

  const handleUpVote = () => {
    if (!voteType || voteType === "downvote") {
      const updatedArticle = {
        ...selectedArticle,
        votes: selectedArticle.votes + 1,
      };
      onVote(updatedArticle);
      setVoteType("upvote");
      upVoteArticle(articleId)
        .catch((error) => {
          console.error("Error upvoting article:", error);
          onVote(selectedArticle);
          setVoteType(null);
        });
    }
  };

  const handleDownVote = () => {
    if (!voteType || voteType === "upvote") {
      const updatedArticle = {
        ...selectedArticle,
        votes: selectedArticle.votes - 1,
      };
      onVote(updatedArticle);
      setVoteType("downvote");
      downVoteArticle(articleId)
        .catch((error) => {
          console.error("Error downvoting article:", error);
          onVote(selectedArticle);
          setVoteType(null);
        });
    }
  };

  return (
    <div>
      <button onClick={handleUpVote} disabled={voteType === "upvote"}>
        👍
      </button>
      <button onClick={handleDownVote} disabled={voteType === "downvote"}>
        👎
      </button>
      {voteType && (
        <p>Your current vote: {voteType === "upvote" ? "UP" : "DOWN"}</p>
      )}
    </div>
  );
};

export default VoteButtons;
