import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TriviaProvider } from "./contexto/TriviaContext";
import Layout from "./componentes/Layout";
import Preguntas from "./pages/Preguntas";
import Resultados from "./pages/Resultados";

export default function App() {
  return (
    <TriviaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Preguntas />} />
            <Route path="resultados" element={<Resultados />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TriviaProvider>
  );
}
