import { NavLink } from "react-router-dom";
import "./Navbar.css";

// Componente reutilizable de navegación. Recibe la lista de links como prop
// para que sea fácil de reutilizar/editar sin tocar el JSX del componente.
const defaultLinks = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/galeria", label: "Galería" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar({ brand = "Luz de Preta", links = defaultLinks }) {
  return (
    <header>
      <nav className="navbar">
        <div className="container nav-container">
          <NavLink to="/" className="logo">
            {brand}
          </NavLink>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) => (isActive ? "active-link" : undefined)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
