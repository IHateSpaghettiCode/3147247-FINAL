import Quiz from "../componentes/Quiz";
import PersonalityPage from "../componentes/PersonalityPage";
import { Routes, Route } from "react-router-dom";

function QuizPage() {
  return (
    <Routes>
      {/* Ruta raíz de QuizPage → el test */}
      <Route path="/" element={<Quiz />} />

      {/* Ruta dinámica para el resultado */}
      <Route path="/personality/:type" element={<PersonalityPage />} />
    </Routes>
  );
}

export default QuizPage;
