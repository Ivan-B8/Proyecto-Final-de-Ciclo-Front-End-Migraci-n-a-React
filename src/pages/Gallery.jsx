import Gallery from "../components/Gallery.jsx";
import { imagenesGaleria } from "../data/galeria.js";
import "./Gallery.css";

export default function GalleryPage() {
  return (
    <main>
      <h2 className="título-galería">Algunos de nuestros trabajos</h2>
      <Gallery images={imagenesGaleria} />
    </main>
  );
}
