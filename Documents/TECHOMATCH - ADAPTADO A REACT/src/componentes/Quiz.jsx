import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import style from "../styles/styles_test.module.css";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({ E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 });
  const [fade, setFade] = useState("fadeIn");
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const currentQuestion = questions[currentIndex];

  const recordAnswer = (value) => {
    setSelectedOption(value);
    const polo = currentQuestion.mapaPuntos[value];
    if (polo) setScores((prev) => ({ ...prev, [polo]: prev[polo] + 1 }));

    setFade("fadeOut");
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setFade("fadeIn");
      } else {
        const type =
          (scores.E >= scores.I ? "E" : "I") +
          (scores.S >= scores.N ? "S" : "N") +
          (scores.T >= scores.F ? "T" : "F") +
          (scores.J >= scores.P ? "J" : "P");
        navigate(`/personality/${type}`);
      }
    }, 400);
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <main>
      <h1>Cuestionario MBTI</h1>

      {/* Barra de progreso con clases del module */}
      <div className={style.progress}>
        <span className={style.progressText}>
          Pregunta {currentIndex + 1} de {questions.length}
        </span>
        <div className={style.progressBar}>
          <div className={style.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Aplica fade desde el module */}
      <section className={style[fade]}>
        <p>{currentQuestion.texto}</p>

        <div className={style.likertScale}>
          <span className={style.labelAgree}>De acuerdo</span>

          {[1, 2, 3, 4, 5].map((val) => (
            <React.Fragment key={val}>
              <input
                type="radio"
                name={`q-${currentIndex}`}
                id={`opt-${val}`}
                value={val}
                checked={selectedOption === String(val)}
                onChange={(e) => recordAnswer(e.target.value)}
              />
              <label
                htmlFor={`opt-${val}`}
                className={`${style.circle} ${
                  val === 1
                    ? style.strongAgree
                    : val === 2
                    ? style.agree
                    : val === 3
                    ? style.neutral
                    : val === 4
                    ? style.disagree
                    : style.strongDisagree
                }`}
              />
            </React.Fragment>
          ))}

          <span className={style.labelDisagree}>En desacuerdo</span>
        </div>
      </section>
    </main>
  );
};

export default Quiz;