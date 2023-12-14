import React, { useEffect, useState } from "react";
import ArticleCard from "./articleCard";
import { useLocation } from "react-router-dom";

const ArticlesPage = ({ articles }) => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topic = searchParams.get("topic");

  useEffect(() => {
    const filteredArticlesByTopic = () => {
      if (topic) {
        const filtered = articles.filter((article) =>
          article.topic && article.topic.includes(topic)
        );
        setFilteredArticles(filtered);
      } else {
        setFilteredArticles(articles);
      }
    };
    filteredArticlesByTopic();
  }, [topic, articles]);

  return (
    <div className="all-articles-display">
      <h1 className="all-articles-header">
        {topic ? `Articles about ${topic}` : `All Articles`}
      </h1>
      <ul>
        {filteredArticles.map((article) => (
          <li key={article.article_id} className="article-item">
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;
