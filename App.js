import { useState } from 'react';

const questions = [
  {
    question: "What are the three primary components of the U.S. criminal justice system?",
    options: [
      "A. FBI, Homeland Security, and DEA",
      "B. Law enforcement, courts, and corrections",
      "C. Police, lawyers, and the National Guard",
      "D. Civil court, juvenile court, and family court"
    ],
    answer: "B",
    explanation: "The three main components are law enforcement, courts, and corrections."
  },
  {
    question: "True or False: A balanced diet includes protein, fat, carbohydrates, vitamins, and minerals.",
    options: ["A. True", "B. False"],
    answer: "A",
    explanation: "A balanced diet must include macronutrients (protein, fat, carbs) and micronutrients (vitamins and minerals)."
  },
  {
    question: "What does 'deliberate indifference' in a correctional setting refer to?",
    options: [
      "A. Giving incorrect medication",
      "B. Intentionally ignoring serious medical needs",
      "C. Choosing one treatment over another",
      "D. Being rude to medical staff"
    ],
    answer: "B",
    explanation: "Deliberate indifference means knowingly ignoring an inmate's serious medical need, which can be a constitutional violation."
  }
];

export default function FinalQuizApp() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    setShowExplanation(true);
    if (option[0] === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowExplanation(false);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">Quiz Complete!</h2>
        <p className="text-lg mt-2">Your score: {score} / {questions.length}</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">Question {current + 1} of {questions.length}</h2>
      <p className="mb-4">{q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className={`block w-full text-left p-3 rounded border ${selected === opt
              ? (opt[0] === q.answer ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100')
              : 'border-gray-300 hover:bg-gray-100'}`}
            disabled={showExplanation}
          >
            {opt}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500">
          {selected[0] === q.answer
            ? <p className="text-green-700 font-medium">Correct!</p>
            : <p className="text-red-700 font-medium">Incorrect. The correct answer is {q.answer}.</p>}
          <p className="text-sm mt-1">Explanation: {q.explanation}</p>
        </div>
      )}
      {showExplanation && (
        <button onClick={nextQuestion} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Next
        </button>
      )}
    </div>
  );
}