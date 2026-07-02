// ⚠️ IMPORTANTE: reemplazá este número por el real de Luz de Preta,
// en formato internacional y sin espacios ni signos.
const NUMERO_WHATSAPP = "5491100000000";
const MENSAJE_POR_DEFECTO = "Hola! Vengo de la web de Luz de Preta y quería hacer una consulta.";

export default function WhatsappButton({
  numero = NUMERO_WHATSAPP,
  mensaje = MENSAJE_POR_DEFECTO,
}) {
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsappButton"
      aria-label="Escribinos por WhatsApp"
    >
      🟢
    </a>
  );
}
