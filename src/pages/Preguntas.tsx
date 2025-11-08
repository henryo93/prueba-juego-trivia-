import { useState, useEffect, useContext } from "react";
import { TriviaContext } from "../contexto/TriviaContext";
import { useNavigate } from "react-router-dom";

interface Pregunta {
  idPregunta: number;
  descripcionPregunta: string;
  respuestaCorrecta: boolean;
  puntajePregunta: number;
}

export default function Preguntas() {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [seleccion, setSeleccion] = useState<boolean | null>(null);
  const [resultado, setResultado] = useState<string>("");
  const contexto = useContext(TriviaContext);
  const navegar = useNavigate();

  if (!contexto) return null;
  const { aumentarPuntaje, registrarRespuesta } = contexto;

  useEffect(() => {
    const lista: Pregunta[] = [
      { idPregunta: 1, descripcionPregunta: "El sol es una estrella.", respuestaCorrecta: true, puntajePregunta: 1 },
      { idPregunta: 2, descripcionPregunta: "La capital de España es Barcelona.", respuestaCorrecta: false, puntajePregunta: 1 },
      { idPregunta: 3, descripcionPregunta: "Los humanos pueden respirar bajo el agua sin equipo.", respuestaCorrecta: false, puntajePregunta: 1 },
      { idPregunta: 4, descripcionPregunta: "El agua hierve a 100 grados Celsius.", respuestaCorrecta: true, puntajePregunta: 1 },
      { idPregunta: 5, descripcionPregunta: "JavaScript fue creado después de Java.", respuestaCorrecta: true, puntajePregunta: 1 },
    ];
    setPreguntas(lista);
  }, []);

  const responder = (respuesta: boolean) => {
    const actual = preguntas[indiceActual];
    const esCorrecta = respuesta === actual.respuestaCorrecta;
    setSeleccion(respuesta);
    setResultado(esCorrecta ? "Respuesta correcta" : "Respuesta incorrecta");
    registrarRespuesta();
    if (esCorrecta) aumentarPuntaje(actual.puntajePregunta);
  };

  const siguiente = () => {
    if (indiceActual < preguntas.length - 1) {
      setIndiceActual(indiceActual + 1);
      setSeleccion(null);
      setResultado("");
    } else {
      navegar("/resultados");
    }
  };

  if (preguntas.length === 0) return <p>Cargando preguntas...</p>;
  const actual = preguntas[indiceActual];

  return (
    <div className="contenedor">
      <h2>Pregunta {indiceActual + 1} de {preguntas.length}</h2>
      <p>{actual.descripcionPregunta}</p>

      <div className="opciones">
        <button disabled={seleccion !== null} onClick={() => responder(true)}>Verdadero</button>
        <button disabled={seleccion !== null} onClick={() => responder(false)}>Falso</button>
      </div>

      {resultado && (
        <div className="resultado">
          <p>{resultado}</p>
          <button onClick={siguiente}>Siguiente</button>
        </div>
      )}
    </div>
  );
}
