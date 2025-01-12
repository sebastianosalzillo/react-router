import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../App.css";

function Post() {
  const [articles, setArticles] = useState([]);
  const API_URL = "http://localhost:3000/posts";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setArticles(response.data.posts || []);
      })
      .catch((error) => {
        console.error("Errore durante il fetch:", error);
      });
  }, []);

  const removeArticle = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then((response) => {
        setArticles(response.data.posts || []);
      })
      .catch((error) => {
        console.error("Errore durante la rimozione:", error);
      });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Lista Articoli</h1>
      <ul className="list-group">
        {articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id} className="list-group-item">
              <h5>
                <NavLink to={`/posts/${article.id}`}>{article.titolo}</NavLink>
              </h5>
              <p>{article.contenuto}</p>
              <button
                onClick={() => removeArticle(article.id)}
                className="btn btn-danger"
              >
                Rimuovi
              </button>
            </li>
          ))
        ) : (
          <p className="text-muted">Nessun articolo disponibile</p>
        )}
      </ul>
    </div>
  );
}

export default Post;
