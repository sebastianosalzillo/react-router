import React from "react";
import Post from "../components/Post";
import "../App.css"; 

function HomePage() {
  return (
    <div className="homePage">
      <Post className="post" />
    </div>
  );
}

export default HomePage;
