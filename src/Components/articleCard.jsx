import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "en-uk",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="article-card-background">
      <div className="article-card">
        <Link to={`/articles/${article.article_id}`}>
          <img
            className="article-card-img"
            src={article.article_img_url}
            alt={article.title}
          />
          <h3>{article.title}</h3>
        </Link>
        <p>Author: {article.author}</p>
        <p>Votes: {article.votes}</p>
        <p>Topic: {article.topic}</p>
        <p>{formattedDate}</p>
        <p>Comment Count: {article.comment_count}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
