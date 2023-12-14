import axios from 'axios'

const fetchArticles = (sortBy, order, topic) => {
  let url = "https://crowleysnewsapi.onrender.com/api/articles?limit=200";

  return axios.get(url, {
    params: {
      sort_by: sortBy,
      order: order,
      topic: topic
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching articles: ${error.message}`);
    });
};

const fetchArticleById = (articleId) => {
  let url = `https://crowleysnewsapi.onrender.com/api/articles/${articleId}`;

  return axios.get(url)
  .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching articles: ${error.message}`);
    });
}

const fetchComments = (articleId) => {
  const url = `https://crowleysnewsapi.onrender.com/api/articles/${articleId}/comments`

  return axios.get(url)
  .then((response) => response.data)
  .catch((error) => {
    throw new Error(`Error fetching comments: ${error.message}`)
  })
}

const postComment = (articleId, commentWithUser) => {
  const url = `https://crowleysnewsapi.onrender.com/api/articles/${articleId}/comments`
  const usernameInput = commentWithUser.username
  const bodyInput = commentWithUser.body
  return axios.post(url, {
    username: usernameInput,
    body: bodyInput
  })
  .then((response) => {
    if (response.data.postedComment) {
      return response.data.postedComment
    } else {
      throw new Error("Invalid response format")
    }
  })
}

const deleteComment = (comment_id) => {
  const url = `https://crowleysnewsapi.onrender.com/api/comments/${comment_id}`
  return axios.delete(url)
}

const upVoteArticle = (articleId) => {
  const url = `https://crowleysnewsapi.onrender.com/api/articles/${articleId}`

  return axios.patch(url, { inc_votes: 1})
  .then((response) => response.data)
  .catch((error) => {
    throw new Error(`Error upvoting article: ${error.message}`)
  })
}

const downVoteArticle = (articleId) => {
  const url = `https://crowleysnewsapi.onrender.com/api/articles/${articleId}`

  return axios.patch(url, { inc_votes: -1 })
  .then((response) => response.data)
  .catch((error) => {
    throw new Error(`Error upvoting article: ${error.message}`)
  })
}
  
export { fetchArticleById, fetchArticles, upVoteArticle, downVoteArticle, fetchComments, postComment, deleteComment };