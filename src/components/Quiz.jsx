import React, { useState } from "react";
import "../css/quiz.css";

function Quiz({ quizData, shuffleArray }) {
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [index, setIndex] = useState(0);
  const correctAnswer = quizData[index].name.official;

  const updateIndex = (currentIndex) => {
    setIndex(currentIndex);
  };

  const updateAnswers = (userOption) => {
    if (answeredQuestions[index]) return; // If already answered, do nothing

    setAnsweredQuestions((prevAnswers) => ({
      ...prevAnswers,
      [index]: {
        selectedOption: userOption,
        isCorrect: userOption === correctAnswer,
        isAnswered: true,
      },
    }));
  };

  const getOptions = () => {
    const shuffledRawData = shuffleArray(quizData);
    const wrongOptionsArray = shuffledRawData
      .filter((_, i) => index !== i)
      .slice(0, 3)
      .map((country) => country.name.official);

    const allOptionsArray = [correctAnswer, ...wrongOptionsArray];
    return shuffleArray(allOptionsArray);
  };

  const options = getOptions();

  // Set default empty object if no answer yet
  const currentAnsweredQuestion = answeredQuestions[index] || {};

  // Destructure properties from the currentAnsweredQuestion object
  const { isAnswered, selectedOption, isCorrect } = currentAnsweredQuestion;

  return (
    <section className="quiz-wrapper">
      <h1 className="quiz-title">Country Quiz</h1>

      {/* Navigation Buttons */}
      <ul className="navigation-btn-wrapper">
        {quizData.map((_, i) => {
          const isActive = i === index;
          return (
            <li key={i} className="navigation-item">
              <button
                className={`navigation-btn ${isActive && "active"}`}
                type="button"
                onClick={() => updateIndex(i)}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Question & Options */}
      <div className="questions-wrapper">
        <h2 className="question">{`What is the official name of ${quizData[index].name.common}?`}</h2>

        <ul className="options-wrapper">
          {options.map((option, i) => {
            // Determine button classes
            const isSelected = selectedOption === option;
            const buttonClass = isSelected
              ? isCorrect
                ? "correct"
                : "wrong"
              : "";

            return (
              <li key={i} className="option-item">
                <button
                  className={`option-btn ${buttonClass}`}
                  type="button"
                  onClick={() => updateAnswers(option)}
                  disabled={isAnswered} // Disable options if already answered
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Quiz;
