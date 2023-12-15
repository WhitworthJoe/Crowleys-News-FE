import React, { useEffect, useState } from "react";
import ArticleCard from "./articleCard";
import { useLocation, useNavigate } from "react-router-dom";

const ArticlesPage = ({ articles }) => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const topic = searchParams.get("topic") || "";

  useEffect(() => {
    const filteredArticlesByTopic = () => {
      let sortedArticles = [...articles];
      sortedArticles.sort((a, b) => {
        if (sortBy === "created_at") {
          return sortOrder === "asc"
            ? new Date(a[sortBy]) - new Date(b[sortBy])
            : new Date(b[sortBy]) - new Date(a[sortBy]);
        } else if (sortBy === "comment_count" || sortBy === "votes") {
          return sortOrder === "asc"
            ? a[sortBy] - b[sortBy]
            : b[sortBy] - a[sortBy];
        }
        return 0;
      });

      if (topic) {
        const filtered = sortedArticles.filter(
          (article) => article.topic && article.topic.includes(topic)
        );
        if (filtered.length === 0) {
          setError(`No articles found for the topic: ${topic}`);
          setFilteredArticles([])
        } else {
          setFilteredArticles(filtered);
          setError(null); // Clear any previous errors
        }
      } else {
        setFilteredArticles(sortedArticles);
      }
    };
    filteredArticlesByTopic();
  }, [topic, articles, sortBy, sortOrder]);

  useEffect(() => {
    navigate(`?topic=${topic}&sort=${sortBy}&order=${sortOrder}`);
  }, [topic, sortBy, sortOrder, navigate]);

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    if (name === "sortBy") {
      setSortBy(value);
    } else if (name === "sortOrder" || name === "order") {
      setSortOrder(value);
    }
  };

  return (
    <div className="all-articles-display">
      <h1 className="all-articles-header">
        {topic ? `Articles about ${topic}` : `All Articles`}
      </h1>
      <div className="sort-container">
        <div className="sort-item">
          <label htmlFor="sort">Sort By: </label>
          <select id="sort" name="sortBy" onChange={handleSortChange}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
        </div>
        <div className="sort-item">
          <label htmlFor="order">Sort Order: </label>
          <select id="order" name="sortOrder" onChange={handleSortChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {filteredArticles.map((article) => (
            <li key={article.article_id} className="article-item">
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticlesPage;
