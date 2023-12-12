const fetchArticles = () => {
    return fetch("https://crowleysnewsapi.onrender.com/api/articles?limit=200")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        throw error; // Re-throw the error to handle it in the calling code if needed
      });
  };
  
  export default fetchArticles