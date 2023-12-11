import React from "react";

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
        <img
          className="article-card-img"
          src={article.article_img_url}
          alt={article.title}
        />
        <h3>{article.title}</h3>
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
