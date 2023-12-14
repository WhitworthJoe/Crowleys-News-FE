import React, { useEffect, useState } from "react";
import ArticleCard from "./articleCard";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchArticles } from "../api";

const ArticlesPage = ({ articles }) => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const topic = searchParams.get("topic");

  useEffect(() => {
    const updateURL = () => {
      const params = new URLSearchParams();
      if (topic) params.set("topic", topic);
      params.set("sort_by", sortBy)
      params.set("order", order)
      navigate(`/articles?${params.toString()}`)
    }

    const filteredArticlesByTopic = () => {
      fetchArticles(sortBy, order, topic)
        .then((data) => {
          setFilteredArticles(data);
          updateURL();
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
        });
    };
  
    filteredArticlesByTopic();
  }, [topic, sortBy, order, navigate]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  return (
    <div className="all-articles-display">
      <h1 className="all-articles-header">
        {topic ? `Articles about ${topic}` : `All Articles`}
      </h1>
      <div>
        <label>
          Sort By:
          <select value={sortBy} onChange={handleSortChange}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <label>
          Order:
          <select value={order} onChange={handleOrderChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
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
