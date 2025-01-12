import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const API_URL = `http://localhost:3000/posts/${id}`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Errore durante il fetch:", error);
      });
  }, [id]);

  if (!post) {
    return <p>Caricamento in corso...</p>;
  }

  return (
    <div className="container my-5">
      <h1>{post.titolo}</h1>
      <img src={post.immagine} alt={post.titolo} style={{ maxWidth: "100%" }} />
      <p>{post.contenuto}</p>
      <p>Tags: {post.tags.join(", ")}</p>
    </div>
  );
}

export default PostDetail;
