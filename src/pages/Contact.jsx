import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    titolo: "",
    immagine: "",
    contenuto: "",
    tags: [],
  });

  const API_URL = "http://localhost:3000/posts";
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddArticle = (event) => {
    event.preventDefault();

    const newArticle = { ...formData };

    axios
      .post(API_URL, newArticle)
      .then((response) => {
        const createdPost = response.data.posts[response.data.posts.length - 1];
        navigate(`/posts/${createdPost.id}`);
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

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Crea un Nuovo Post</h1>

      <form onSubmit={handleAddArticle} className="mb-4">
        <div className="mb-3">
          <label htmlFor="titolo" className="form-label">Titolo del Post</label>
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
          <label htmlFor="immagine" className="form-label">URL Immagine</label>
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
          <label htmlFor="contenuto" className="form-label">Contenuto</label>
          <textarea
            id="contenuto"
            name="contenuto"
            className="form-control"
            value={formData.contenuto}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tag (separati da virgola)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="form-control"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",") })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Crea Post</button>
      </form>
    </div>
  );
}

export default Contact;
