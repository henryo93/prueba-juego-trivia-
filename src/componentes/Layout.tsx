import { useContext } from "react";
import { TriviaContext } from "../contexto/TriviaContext";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const contexto = useContext(TriviaContext);
  if (!contexto) return null;
  const { puntaje } = contexto;

  return (
    <>
      <header className="encabezado">
        <h1>Trivia</h1>
        <p>Puntaje: {puntaje}</p>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
