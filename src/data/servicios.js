import cartas1 from "../assets/img/cartas1.jpg";
import velas2 from "../assets/img/velas2.jpg";
import preta from "../assets/img/Preta.jpg";

// Cada objeto representa una card de servicio. El componente <Card />
// recibe estos datos como props (imagen, título, texto y texto del botón).
export const servicios = [
  {
    id: "tarot",
    image: cartas1,
    imageAlt: "Cartas de Tarot",
    title: "Lecturas de Tarot",
    text: "Consultas personalizadas para encontrar claridad en amor, trabajo, dinero y salud.",
    buttonText: "Agendá tu sesión",
  },
  {
    id: "espirituales",
    image: velas2,
    imageAlt: "Velas rituales",
    title: "Trabajos espirituales",
    text: "Rituales y trabajos a medida para equilibrar tus energías y las de tu entorno.",
    buttonText: "Pedí el tuyo",
  },
  {
    id: "tienda",
    image: preta,
    imageAlt: "Tienda Preta",
    title: "Tienda",
    text: "Elementos rituales, velas y artículos esotéricos seleccionados para vos.",
    buttonText: "Ver tienda",
  },
];
