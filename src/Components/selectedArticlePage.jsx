import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { downVoteArticle, fetchArticles, upVoteArticle } from "../api";

const SelectedArticle = ({ fetchArticles }) => {
  const { articleId } = useParams();
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [voteType, setVoteType] = useState(null);

  const formattedDate = new Date(selectedArticle.created_at).toLocaleDateString(
    "en-uk",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleUpVote = () => {
    if (!voteType || voteType === 'downvote') {
      upVoteArticle(articleId)
        .then((updatedArticle) => {
          setSelectedArticle(updatedArticle);
          setVoteType('upvote');
        })
        .catch((error) => {
          console.error("Error upvoting article:", error);
        });
    }
  };

  const handleDownVote = () => {
    if (!voteType || voteType === 'upvote') {
      downVoteArticle(articleId)
        .then((updatedArticle) => {
          setSelectedArticle(updatedArticle);
          setVoteType('downvote')
        })
        .catch((error) => {
          console.error("Error downvoting article:", error);
        });
    }
  };

  useEffect(() => {
    const fetchSelectedArticle = () => {
      setIsLoading(true);

      fetchArticles(articleId)
        .then((data) => {
          setSelectedArticle(data);
        })
        .catch((error) => {
          console.error("Error fetching selected article:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchSelectedArticle();
  }, [articleId]);

  return (
    <div className="selected-article-background">
      <div className="selected-article-card">
        <h2>{selectedArticle.title}</h2>
        <p>Posted by: {selectedArticle.author}</p>
        <p id="selected-article-date">{formattedDate}</p>
        <img
          className="selected-article-img"
          src={selectedArticle.article_img_url}
          alt={selectedArticle.title}
        />
        <p>{selectedArticle.body}</p>
        <p>Topic: {selectedArticle.topic}</p>
        <p>{selectedArticle.votes} {selectedArticle.votes === 1 ? 'Vote!' : 'Votes!'}</p>
      </div>
      <button onClick={handleUpVote} disabled={voteType === 'upvote'}>👍</button>
        <button onClick={handleDownVote} disabled={voteType === 'downvote'}>👎</button>
        {voteType && <p>Your current vote: {voteType === 'upvote' ? 'UP' : 'DOWN'}</p>}
    </div>
  );
};

export default SelectedArticle;
