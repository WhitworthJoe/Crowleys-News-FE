const fetchArticles = (articleId = null) => {
  let url = "https://crowleysnewsapi.onrender.com/api/articles?limit=200";

  if (articleId) {
    url = `https://crowleysnewsapi.onrender.com/api/articles/${articleId}`;
  }

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(`Error fetching articles: ${error.message}`);
    });
};

const upVoteArticle = (articleId) => {
  const url = `https://crowleysnewsapi.onrender.com/api/articles/${articleId}`

  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({inc_votes: 1})
  })
  .then((response) => response.json())
  .catch((error) => {
    throw new Error(`Error upvoting article: ${error.message}`)
  })
}

const downVoteArticle = (articleId) => {
  const url = `https://crowleysnewsapi.onrender.com/api/articles/${articleId}`

  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({inc_votes: -1})
  })
  .then((response) => response.json())
  .catch((error) => {
    throw new Error(`Error upvoting article: ${error.message}`)
  })
}
  
export { fetchArticles, upVoteArticle, downVoteArticle };