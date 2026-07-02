import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      className="darkButton"
      onClick={() => setDark((prev) => !prev)}
      aria-label="Cambiar modo oscuro"
      type="button"
    >
      🌙
    </button>
  );
}
