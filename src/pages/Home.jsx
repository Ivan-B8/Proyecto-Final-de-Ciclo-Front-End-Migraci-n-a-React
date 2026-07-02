import Carousel from "../components/Carousel.jsx";
import CartaDelDia from "../components/CartaDelDia.jsx";
import "./Home.css";

const parrafosPorDefecto = [
  "Luz de Preta nació en Septiembre del año 2024. Su objetivo era claro: ayudar a todas las personas que lo necesiten. ¿De qué manera? Proporcionando soluciones y herramientas a todos los problemas que tengas en tu vida. Es mediante la observación de las circustancias, el análisis de ellas y la decisión de utilizar las energías de forma correcta que podemos brindar luz a todas aquellas dificultades que tengas hoy en día. ¿Sobre qué aspectos o temáticas podemos trabajar en tu vida? Con absolutamente todos: amor, dinero, trabajo, salud y circustancias específicas que vos decidas.",
  "En Luz de Preta tenemos trabajos a la medida del consultante. Creemos firmemente que el respeto sobre nuestro trabajo y por la persona que acude a nosotros es vital a la hora de ofrecer claridad a la vida de las personas. Es por este motivo, que tenemos como claro objetivo el bienestar del prójimo y la resolución de sus problemáticas.",
];


export default function Home({
  title = "¿Quiénes somos?",
  paragraphs = parrafosPorDefecto,
  carouselImages = [],
}) {
  return (
    <main>
      <h2>{title}</h2>
      <br />
      {paragraphs.map((texto, i) => (
        <p key={i}>{texto}</p>
      ))}

      <Carousel images={carouselImages} />

      <CartaDelDia />
    </main>
  );
}
