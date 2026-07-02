import { useEffect, useState } from "react";

// Reemplaza al loader.js original: se oculta apenas termina de montar la app.
export default function Loader() {
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOculto(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader${oculto ? " hide" : ""}`}>
      <div className="loader-spinner" />
    </div>
  );
}
