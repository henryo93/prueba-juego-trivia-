import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface TriviaContextType {
  puntaje: number;
  preguntasRespondidas: number;
  aumentarPuntaje: (valor: number) => void;
  registrarRespuesta: () => void;
  reiniciarJuego: () => void;
}

export const TriviaContext = createContext<TriviaContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function TriviaProvider({ children }: Props) {
  const [puntaje, setPuntaje] = useState(0);
  const [preguntasRespondidas, setPreguntasRespondidas] = useState(0);

  const aumentarPuntaje = (valor: number) => {
    setPuntaje(puntaje + valor);
  };

  const registrarRespuesta = () => {
    setPreguntasRespondidas((prev) => prev + 1);
  };

  const reiniciarJuego = () => {
    setPuntaje(0);
    setPreguntasRespondidas(0);
  };

  return (
    <TriviaContext.Provider value={{ puntaje, preguntasRespondidas, aumentarPuntaje, registrarRespuesta,reiniciarJuego }}>
      {children}
    </TriviaContext.Provider>
  );
}
