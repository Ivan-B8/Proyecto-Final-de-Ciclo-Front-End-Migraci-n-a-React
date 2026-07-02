import { useEffect, useMemo, useState } from "react";
import "./Gallery.css";

// Recibe el array de imágenes por props: [{ id, src, alt }, ...]
export default function Gallery({ images = [] }) {
  const [busqueda, setBusqueda] = useState("");
  const [indiceAbierto, setIndiceAbierto] = useState(null); // null = lightbox cerrado

  const imagenesFiltradas = useMemo(() => {
    const termino = busqueda.toLowerCase().trim();
    if (!termino) return images;
    return images.filter((img) => img.alt.toLowerCase().includes(termino));
  }, [busqueda, images]);

  const lightboxAbierto = indiceAbierto !== null;

  const abrirLightbox = (indice) => setIndiceAbierto(indice);
  const cerrarLightbox = () => setIndiceAbierto(null);

  const siguiente = () =>
    setIndiceAbierto((prev) => (prev + 1) % imagenesFiltradas.length);
  const anterior = () =>
    setIndiceAbierto((prev) => (prev - 1 + imagenesFiltradas.length) % imagenesFiltradas.length);

  // Navegación con teclado mientras el lightbox está abierto
  useEffect(() => {
    if (!lightboxAbierto) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") cerrarLightbox();
      if (e.key === "ArrowRight") siguiente();
      if (e.key === "ArrowLeft") anterior();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxAbierto, imagenesFiltradas.length]);

  const imagenActual = lightboxAbierto ? imagenesFiltradas[indiceAbierto] : null;

  return (
    <>
      <div className="gallery-search">
        <input
          id="gallerySearch"
          type="text"
          placeholder="Buscar imagen..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="gallery-grid">
        {imagenesFiltradas.map((img, i) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            onClick={() => abrirLightbox(i)}
          />
        ))}
        {imagenesFiltradas.length === 0 && (
          <p className="gallery-empty">No se encontraron imágenes.</p>
        )}
      </div>

      {lightboxAbierto && (
        <div className="lightbox active" onClick={(e) => e.target === e.currentTarget && cerrarLightbox()}>
          <img src={imagenActual.src} alt={imagenActual.alt} />
          <span className="lightbox-contador">
            {indiceAbierto + 1} / {imagenesFiltradas.length}
          </span>
          <button
            className="lightbox-nav lightbox-prev"
            aria-label="Imagen anterior"
            type="button"
            onClick={anterior}
          >
            &#10094;
          </button>
          <button
            className="lightbox-nav lightbox-next"
            aria-label="Imagen siguiente"
            type="button"
            onClick={siguiente}
          >
            &#10095;
          </button>
          <button
            className="lightbox-close"
            aria-label="Cerrar"
            type="button"
            onClick={cerrarLightbox}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
