import { useEffect, useState } from "react";
import "./Contact.css";

const valoresIniciales = {
  nombre: "",
  email: "",
  telefono: "",
  servicio: "Seleccionar servicio",
  contacto: "",
  comentario: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  // Estado único con todos los valores del formulario (formulario controlado).
  const [formData, setFormData] = useState(valoresIniciales);
  // Estado de errores de validación por campo.
  const [errores, setErrores] = useState({});
  // Estado del toast de confirmación.
  const [toast, setToast] = useState({ visible: false, mensaje: "" });

  // El toast se oculta solo después de unos segundos.
  useEffect(() => {
    if (!toast.visible) return undefined;
    const timer = setTimeout(() => setToast({ visible: false, mensaje: "" }), 3500);
    return () => clearTimeout(timer);
  }, [toast.visible]);

  // Maneja el cambio de cualquier input/select por su atributo "name".
  const handleChange = (e) => {
    const { name, value } = e.target;

    // El teléfono solo permite números, espacios y guiones.
    const valorLimpio =
      name === "telefono" ? value.replace(/[^\d\s-]/g, "") : value;

    setFormData((prev) => ({ ...prev, [name]: valorLimpio }));
  };

  const validarCampo = (name, value) => {
    switch (name) {
      case "nombre":
        return value.trim().length < 3 ? "Debe ingresar al menos 3 caracteres." : "";
      case "email":
        return !EMAIL_REGEX.test(value.trim()) ? "Ingresá un email válido." : "";
      case "telefono": {
        const valor = value.trim();
        if (valor === "") return ""; // es opcional
        const digitos = valor.replace(/\D/g, "");
        return digitos.length < 8 || digitos.length > 15
          ? "Ingresá un teléfono válido (8 a 15 dígitos)."
          : "";
      }
      default:
        return "";
    }
  };

  // Valida en vivo el campo que se acaba de modificar.
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrores((prev) => ({ ...prev, [name]: validarCampo(name, value) }));
  };

  const handleReset = (e) => {
    if (e) e.preventDefault();
    setFormData(valoresIniciales);
    setErrores({});
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página al enviar

    const nuevosErrores = {
      nombre: validarCampo("nombre", formData.nombre),
      email: validarCampo("email", formData.email),
      telefono: validarCampo("telefono", formData.telefono),
    };
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((msg) => msg !== "");
    if (hayErrores) return;

    // No hay integración real todavía: simulamos el envío en el frontend.
    setToast({
      visible: true,
      mensaje: "¡Consulta enviada! Te vamos a contactar a la brevedad.",
    });
    handleReset();
  };

  return (
    <main>
      <section className="contacto-container">
        <h2>Envía tu consulta</h2>
        <form className="contacto-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errores.nombre ? "invalid" : formData.nombre ? "valid" : ""}
              required
            />
            <span className="error">{errores.nombre}</span>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Tu email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errores.email ? "invalid" : formData.email ? "valid" : ""}
              required
            />
            <span className="error">{errores.email}</span>
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="Tu teléfono"
              value={formData.telefono}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errores.telefono ? "invalid" : formData.telefono ? "valid" : ""}
            />
            <span className="error">{errores.telefono}</span>
          </div>

          <div className="form-group">
            <label htmlFor="servicio">Servicio</label>
            <select
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
            >
              <option>Seleccionar servicio</option>
              <option>Lectura de Tarot</option>
              <option>Trabajo espiritual</option>
              <option>Tienda</option>
            </select>
          </div>

          <div className="form-group">
            <label>Preferencia de contacto</label>
            <div className="radio-group">
              <label>
                <input
                  name="contacto"
                  type="radio"
                  value="WhatsApp"
                  checked={formData.contacto === "WhatsApp"}
                  onChange={handleChange}
                />{" "}
                WhatsApp
              </label>
              <label>
                <input
                  name="contacto"
                  type="radio"
                  value="Email"
                  checked={formData.contacto === "Email"}
                  onChange={handleChange}
                />{" "}
                Email
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comentario">Comentario</label>
            <textarea
              id="comentario"
              name="comentario"
              maxLength={500}
              placeholder="Escribí tu consulta..."
              value={formData.comentario}
              onChange={handleChange}
            />
            <span className="contador">{formData.comentario.length}/500</span>
          </div>

          <div className="form-buttons">
            <button type="submit">Enviar consulta</button>
            <button type="button" className="btn-reset" onClick={handleReset}>
              Limpiar formulario
            </button>
          </div>
        </form>
      </section>

      <div className={`toast${toast.visible ? " show" : ""}`}>{toast.mensaje}</div>
    </main>
  );
}
