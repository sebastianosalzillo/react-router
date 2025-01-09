import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>   
          <Route index element={<HomePage />} /> 
          <Route path="/Contatti" element={<Contact />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
