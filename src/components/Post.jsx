import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../App.css"

function Post() {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    titolo: "",
    immagine: "",
    contenuto: "",
    tags: [],
  });

  const API_URL = "http://localhost:3000/posts";

  // Fetch iniziale degli articoli
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log("Dati ricevuti:", response.data);
        setArticles(response.data.posts || []);  // Evita undefined
      })
      .catch((error) => {
        console.error("Errore durante il fetch:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (e) => {
    setFormData({
      ...formData,
      tags: e.target.value.split(","),
    });
  };

  
  const handleAddArticle = (event) => {
    event.preventDefault();

    const newArticle = {
      ...formData,
    };

    axios
      .post(API_URL, newArticle)
      .then((response) => {
        console.log("Articolo aggiunto:", response.data);
        setArticles(response.data.posts || []);  
        setFormData({
          titolo: "",
          immagine: "",
          contenuto: "",
          tags: [],
        });
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta:", error);
      });
  };

  
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
      <h1 className="text-center mb-4">Gestione Articoli del Blog</h1>
      
      
      <form onSubmit={handleAddArticle} className="mb-4">
        <div className="mb-3">
          <label htmlFor="titolo" className="form-label">
            Titolo dell'articolo
          </label>
          <input
            type="text"
            id="titolo"
            name="titolo"
            className="form-control"
            value={formData.titolo}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="immagine" className="form-label">
            URL Immagine
          </label>
          <input
            type="text"
            id="immagine"
            name="immagine"
            className="form-control"
            value={formData.immagine}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contenuto" className="form-label">
            Contenuto
          </label>
          <textarea
            id="contenuto"
            name="contenuto"
            className="form-control"
            value={formData.contenuto}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Aggiungi Articolo</button>
      </form>

      <ul className="list-group">
        {articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id} className="list-group-item">
              <h5>{article.titolo}</h5>
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
