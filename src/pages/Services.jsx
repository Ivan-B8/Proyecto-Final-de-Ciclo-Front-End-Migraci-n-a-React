import { useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import { servicios } from "../data/servicios.js";
import "./Services.css";

const NUMERO_WHATSAPP = "5491153481222"; 

export default function Services() {
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("default");

  const serviciosVisibles = useMemo(() => {
    const termino = busqueda.toLowerCase().trim();
    let lista = servicios.filter((s) => s.title.toLowerCase().includes(termino));

    if (orden === "az") {
      lista = [...lista].sort((a, b) => a.title.localeCompare(b.title, "es"));
    } else if (orden === "za") {
      lista = [...lista].sort((a, b) => b.title.localeCompare(a.title, "es"));
    }

    return lista;
  }, [busqueda, orden]);

  const contactarPorServicio = (nombreServicio) => {
    const mensaje = `Hola! Quería consultar por el servicio de "${nombreServicio}".`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <p className="texto-inicial">Acá podrás ver nuestros principales servicios</p>

      <section className="cards-toolbar">
        <input
          id="searchCards"
          type="text"
          placeholder="Buscar servicio..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select value={orden} onChange={(e) => setOrden(e.target.value)}>
          <option value="default">Ordenar</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </section>

      <section className="cards-container">
        {serviciosVisibles.map((servicio) => (
          <Card
            key={servicio.id}
            image={servicio.image}
            imageAlt={servicio.imageAlt}
            title={servicio.title}
            text={servicio.text}
            buttonText={servicio.buttonText}
            onButtonClick={() => contactarPorServicio(servicio.title)}
          />
        ))}
        {serviciosVisibles.length === 0 && (
          <p className="cards-empty">No se encontraron servicios.</p>
        )}
      </section>
    </main>
  );
}
