import { useContext } from "react";
import { TriviaContext } from "../contexto/TriviaContext";
import { useNavigate } from "react-router-dom";

export default function Resultados() {
  const contexto = useContext(TriviaContext);
  const navegar = useNavigate();

  if (!contexto) return null;
  const { puntaje, preguntasRespondidas, reiniciarJuego } = contexto;

  const reiniciar = () => {
    reiniciarJuego();
    navegar("/");
  };

  return (
    <div className="contenedor">
      <h2>Resultados</h2>
      <p>Preguntas respondidas: {preguntasRespondidas}</p>
      <p>Puntaje total: {puntaje}</p>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
}
