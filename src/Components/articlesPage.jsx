import React from "react";
import ArticleCard from "./articleCard";

const ArticlesPage = ({ articles }) => {
  return (
    <div className="all-articles-display">
        <h1 className="all-articles-header">All Articles:</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.article_id} className={article}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;
