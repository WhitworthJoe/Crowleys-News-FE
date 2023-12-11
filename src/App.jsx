import { useEffect, useState } from "react";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import ArticlePage from "./Components/articlesPage";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = () => {
      fetch("https://crowleysnewsapi.onrender.com/api/articles?limit=200")
        .then((resonse) => resonse.json())
        .then((data) => {
          setArticles(data);
        })
        .catch((error) => console.error("Error fetching articles:", error));
    };
    fetchArticles();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <MainPage articles={articles} />
            </div>
          }
        />
        <Route
          path="/articles"
          element={
            <div>
              <Header />
              <ArticlePage articles={articles}/>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
import ArticlesPage from "./Components/articlesPage";
import ArticleCard from "./Components/articleCard";

export default App;
