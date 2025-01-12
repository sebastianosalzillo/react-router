import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import PostDetail from "./pages/PostDetail";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/creaPost" element={<Contact />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
