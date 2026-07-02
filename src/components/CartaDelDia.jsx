import { useEffect, useState } from "react";
import { cartasTarot } from "../data/cartasTarot.js";
import "./CartaDelDia.css";

function obtenerFechaHoy() {
  const hoy = new Date();
  return `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`;
}

// Sortea una carta de tarot al azar. Si ya se sacó una carta el mismo día,
// se recuerda con localStorage para mostrar siempre la misma esa jornada.
export default function CartaDelDia() {
  const [carta, setCarta] = useState(null);
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("cartaDelDia") || "null");
    if (guardado && guardado.fecha === obtenerFechaHoy()) {
      setCarta(guardado.carta);
    }
  }, []);

  const sacarCarta = () => {
    const nueva = cartasTarot[Math.floor(Math.random() * cartasTarot.length)];
    setCarta(nueva);
    setAnimar(false);
    // Fuerza el reinicio de la animación en el próximo tick
    requestAnimationFrame(() => setAnimar(true));
    localStorage.setItem(
      "cartaDelDia",
      JSON.stringify({ carta: nueva, fecha: obtenerFechaHoy() })
    );
  };

  useEffect(() => {
    if (carta) setAnimar(true);
  }, [carta]);

  return (
    <section className="carta-dia">
      <h3>Tu carta del día</h3>
      <button className="btn-carta" type="button" onClick={sacarCarta}>
        🔮 {carta ? "Volver a sacar otra carta" : "Sacar mi carta del día"}
      </button>

      {carta && (
        <div className="resultado-carta">
          <div className={`carta-flip${animar ? " mostrar" : ""}`}>
            <h3>{carta.nombre}</h3>
            <p>{carta.significado}</p>
          </div>
        </div>
      )}
    </section>
  );
}
