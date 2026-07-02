import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Loader from "./components/Loader.jsx";
import ScrollTopButton from "./components/ScrollTopButton.jsx";
import DarkModeButton from "./components/DarkModeButton.jsx";
import WhatsappButton from "./components/WhatsappButton.jsx";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import GalleryPage from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";

import { imagenesCarousel } from "./data/carousel.js";
import { homeContent } from "./data/home.js";
import "./pages/Home.css";

export default function App() {
  const location = useLocation();

  
  useEffect(() => {
    document.body.classList.toggle("home-bg", location.pathname === "/");
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Loader />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={homeContent.title}
              paragraphs={homeContent.paragraphs}
              carouselImages={imagenesCarousel}
            />
          }
        />
        <Route path="/servicios" element={<Services />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>

      <ScrollTopButton />
      <DarkModeButton />
      <WhatsappButton />
      <Footer />
    </div>
  );
}
