import { useEffect, useState } from "react";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import ArticlePage from "./Components/articlesPage";
import SelectedArticle from "./Components/selectedArticlePage";
import { fetchArticleById, fetchArticles } from "./api";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      fetchArticles()
        .then((data) => {
          setArticles(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, [fetchArticles]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              {isLoading ? <p>Loading...</p> : <MainPage articles={articles} />}
            </div>
          }
        />
        <Route
          path="/articles"
          element={
            <div>
              <Header />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <ArticlePage articles={articles} />
              )}
            </div>
          }
        />
        <Route
          path="/articles?topic=:topic"
          element={
            <div>
              <Header />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <ArticlePage articles={articles} />
              )}
            </div>
          }
        ></Route>
        <Route
          path="/articles/:articleId"
          element={
            <div>
              <Header />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <SelectedArticle fetchArticlesById={fetchArticleById} />
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
