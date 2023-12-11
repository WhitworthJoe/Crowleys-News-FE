import React from "react";
import ArticleCard from "./articleCard";

const Top5Display = ({ top5Articles }) => {
  return (
    <div className="top-articles-display">
      <ul>
        {top5Articles.map((article) => (
          <li key={article.article_id} className={article}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Top5Display;
