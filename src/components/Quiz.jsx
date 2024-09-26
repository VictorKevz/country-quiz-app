import React, { useState } from "react";
import "../css/quiz.css";

function Quiz({ quizData, shuffleArray }) {
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [questionOptions, setQuestionOptions] = useState({}); // Store options for each question
  const [index, setIndex] = useState(0);
  const correctAnswer = quizData[index].name.official;

  const updateIndex = (currentIndex) => {
    setIndex(currentIndex);
  };

  const updateAnswers = (userOption) => {
    if (answeredQuestions[index]) return; // Do nothing if already answered

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
    // Check if options for this question already exist in state
    if (questionOptions[index]) {
      return questionOptions[index];
    }

    // Generate new options if not already stored
    const shuffledRawData = shuffleArray(quizData);
    const wrongOptionsArray = shuffledRawData
      .filter((_, i) => index !== i)
      .slice(0, 3)
      .map((country) => country.name.official);

      //Shuffle again the options before saving to state!
    const allOptionsArray = shuffleArray([correctAnswer, ...wrongOptionsArray]);

    // Save the generated options for this question
    setQuestionOptions((prevOptions) => ({
      ...prevOptions,
      [index]: allOptionsArray,
    }));

    return allOptionsArray;
  };

  const options = getOptions(); // Get options for the current question

  // Get current answered question or set default
  const currentAnsweredQuestion = answeredQuestions[index] || {};
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