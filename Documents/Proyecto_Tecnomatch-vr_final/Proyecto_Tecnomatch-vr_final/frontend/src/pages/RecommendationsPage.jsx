import React, { useState } from "react";
import RecommendationsPopup from "../components/RecommendationsPopup";

export default function RecommendationsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div>
      <h1>Módulo de Recomendaciones</h1>

      <button
        onClick={() => {
          setSelectedType("INTJ");
          setShowPopup(true);
        }}
      >
        Ver recomendaciones INTJ
      </button>

      <RecommendationsPopup
        showPopup={showPopup}
        onClose={() => setShowPopup(false)}
        code={selectedType}
      />
    </div>
  );
}
