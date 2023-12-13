import React from "react";
import Top5Display from "./top5Display";
import SeeAllButton from "./SeeAllButton";

const MainPage = ({ articles }) => {
  const sortedArticles = articles.sort((a, b) => b.votes - a.votes);
  const top5Articles = sortedArticles.slice(0, 5);

  return (
    <div className="top-article-display">
      <h2>This weeks top 5 columns:</h2>
      <Top5Display top5Articles={top5Articles} />
      <SeeAllButton />
    </div>
  );
};

export default MainPage;
