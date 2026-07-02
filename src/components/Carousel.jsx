import { useEffect, useRef, useState } from "react";
import "./Carousel.css";

const INTERVALO_AUTOPLAY = 4500; // ms

// Carrousel interactivo: recibe el array de imágenes por props.
// Soporta flechas, dots, autoplay pausable, teclado y swipe táctil.
export default function Carousel({ images = [] }) {
  const [indice, setIndice] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const trackRef = useRef(null);

  const total = images.length;

  const irA = (i) => setIndice((prev) => (i + total) % total);
  const siguiente = () => irA(indice + 1);
  const anterior = () => irA(indice - 1);

  const iniciarAutoplay = () => {
    detenerAutoplay();
    intervalRef.current = setInterval(() => {
      setIndice((prev) => (prev + 1) % total);
    }, INTERVALO_AUTOPLAY);
  };

  const detenerAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (total <= 1) return undefined;
    iniciarAutoplay();
    return detenerAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  if (total === 0) return null;

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    detenerAutoplay();
  };

  const onTouchEnd = (e) => {
    const diferencia = touchStartX.current - e.changedTouches[0].clientX;
    const UMBRAL = 40;
    if (diferencia > UMBRAL) siguiente();
    else if (diferencia < -UMBRAL) anterior();
    iniciarAutoplay();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      siguiente();
      iniciarAutoplay();
    }
    if (e.key === "ArrowLeft") {
      anterior();
      iniciarAutoplay();
    }
  };

  return (
    <section
      className="carousel"
      tabIndex={0}
      onMouseEnter={detenerAutoplay}
      onMouseLeave={iniciarAutoplay}
      onFocus={detenerAutoplay}
      onBlur={iniciarAutoplay}
      onKeyDown={onKeyDown}
    >
      <div
        className="carousel-track"
        ref={trackRef}
        style={{ transform: `translateX(-${indice * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {images.map((img) => (
          <div className="carousel-slide" key={img.id}>
            <img src={img.src} alt={img.alt} />
            {img.caption && <p className="carousel-caption">{img.caption}</p>}
          </div>
        ))}
      </div>

      <button
        aria-label="Anterior"
        className="carousel-btn carousel-prev"
        type="button"
        onClick={() => {
          anterior();
          iniciarAutoplay();
        }}
      >
        &#10094;
      </button>
      <button
        aria-label="Siguiente"
        className="carousel-btn carousel-next"
        type="button"
        onClick={() => {
          siguiente();
          iniciarAutoplay();
        }}
      >
        &#10095;
      </button>

      <div className="carousel-dots">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            className={`carousel-dot${i === indice ? " active" : ""}`}
            aria-label={`Ir a la imagen ${i + 1}`}
            onClick={() => {
              irA(i);
              iniciarAutoplay();
            }}
          />
        ))}
      </div>
    </section>
  );
}
