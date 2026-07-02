import "./Card.css";

// Componente puramente presentacional: recibe imagen, título, texto y
// el texto/acción del botón por props, para poder reutilizarse con
// cualquier contenido.
export default function Card({ image, imageAlt, title, text, buttonText, onButtonClick }) {
  return (
    <div className="card">
      <img className="card-img" src={image} alt={imageAlt} />
      <h2>{title}</h2>
      {text && <p className="card-text">{text}</p>}
      <button type="button" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}
