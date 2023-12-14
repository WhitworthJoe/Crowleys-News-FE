import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment, fetchArticleById, fetchComments, postComment } from "../api";
import Comments from "./comments";
import VoteButtons from "./VoteButtons";
import CommentForm from "./commentForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectedArticle = () => {
  const { articleId } = useParams();
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [forceRerender, setForceRerender] = useState(false);

  const hardcodedUser = {
    username: "grumpy19",
  };

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
    setForceRerender(true);
    const commentWithUser = { ...newComment, author: hardcodedUser.username };

    postComment(articleId, commentWithUser)
      .then((data) => {
        setComments((prevComments) => ({
          ...prevComments,
          [data.comment_id]: [data],
        }));
        toast.success("Comment posted successfully!");
        setForceRerender((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        toast.error("Error posting comment. Please try again.");
      })
      .finally(() => {
        setForceRerender(false);
      });
  };

  const handleDeleteComment = (comment_id, commentAuthor) => {
    setForceRerender(true);
    const signedInUser = hardcodedUser;
    const isAuthor = signedInUser.username === commentAuthor.author;

    if (isAuthor) {
      deleteComment(comment_id)
        .then(() => {
          toast.success("Comment deleted successfully!");
          setComments((prevComments) => {
            const updatedComments = { ...prevComments };
            delete updatedComments[comment_id];
            return { ...updatedComments };
          });
          setForceRerender((prev) => !prev);
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
          toast.error("Error deleting comment. Please try again.");
        })
        .finally(() => {
          setForceRerender(false);
        });
    } else {
      toast.error("You can only delete your own comments.");
      setForceRerender(false);
    }
  };

  useEffect(() => {
    const fetchSelectedArticle = () => {
      setIsLoading(true)

      fetchArticleById(articleId)
        .then((data) => {
          setSelectedArticle(data);
        })
        .catch((error) => {
          console.error("Error fetching selected article:", error);
          toast.error('Error fetching selected article. Please try again.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    const fetchArticleComments = () => {
      setIsLoading(true)

      fetchComments(articleId)
        .then((data) => {
          setComments(data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          toast.error('Error fetching comments. Please try again.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchSelectedArticle();
    fetchArticleComments();
  }, [articleId, forceRerender]);

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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Comments
          comments={comments}
          onDeleteComment={handleDeleteComment}
          signedInUser={hardcodedUser}
        />
      )}
    </div>
  );
};

export default SelectedArticle;
