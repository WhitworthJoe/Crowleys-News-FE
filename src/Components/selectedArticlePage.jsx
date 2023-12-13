import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchComments, postComment } from "../api";
import Comments from "./comments";
import VoteButtons from "./VoteButtons";
import CommentForm from "./commentForm";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelectedArticle = ({ fetchArticles }) => {
  const { articleId } = useParams();
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const hardcodedUser = {
    username: "hardcodedUser"
  }

  const formattedDate = new Date(selectedArticle.created_at).toLocaleDateString(
    "en-uk",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleVote = (updatedArticle) => {
    setSelectedArticle(updatedArticle);
  };

  const handleAddComment = (newComment) => {
    const commentWithUser = {...newComment, author: hardcodedUser.username}

    postComment(articleId, commentWithUser)
    .then((data) => {
        setComments((prevComments) => ({
            ...prevComments,
            [data.comment_id]: [data],
        }))
        toast.success('Comment posted successfully!')
    })
    .catch((error) => {
        console.error('Error posting comment:', error)
        toast.error('Error posting comment. Please try again.')
    })
  }

  useEffect(() => {
    const fetchSelectedArticle = () => {

      fetchArticles(articleId)
        .then((data) => {
          setSelectedArticle(data);
        })
        .catch((error) => {
          console.error("Error fetching selected article:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    
    const fetchArticleComments = () => {
      fetchComments(articleId)
        .then((data) => {
          setComments(data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        })
        .finally(() => {
            setIsLoading(false);
          });
    };

    fetchSelectedArticle();
    fetchArticleComments();
  }, [articleId, fetchArticles]);

  return (
    <div className="selected-article-background">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="selected-article-card">
          <h2>{selectedArticle.title}</h2>
          <p>Posted by: {selectedArticle.author}</p>
          <p id="selected-article-date">{formattedDate}</p>
          <img
            className="selected-article-img"
            src={selectedArticle.article_img_url}
            alt={selectedArticle.title}
          />
          <p>{selectedArticle.body}</p>
          <p>Topic: {selectedArticle.topic}</p>
          <p>
            {selectedArticle.votes}{" "}
            {selectedArticle.votes === 1 ? "Vote!" : "Votes!"}
          </p>
        </div>
      )}
      <VoteButtons
        articleId={articleId}
        onVote={handleVote}
        selectedArticle={selectedArticle}
      />
      {error && <p className="error">{error}</p>}
      <h2 className="comments-header">Comments</h2>
      <CommentForm onAddComment={handleAddComment} />
      <ToastContainer />
      {isLoading ? <p>Loading...</p> : <Comments comments={comments} />}
    </div>
  );
};

export default SelectedArticle;
