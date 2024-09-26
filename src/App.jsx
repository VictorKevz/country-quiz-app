import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quizData, setQuizData] = useState([]);

  // Function for fetching data
  const getData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const randomizedData = shuffleArray(data).slice(0, 10); // Shuffle and limit to 10
      setQuizData(randomizedData);
      // console.log(randomizedData); // Keep for debugging
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Algorithm for shuffling the array
  const shuffleArray = (array) => {
    const shuffled = array.slice(); // creates a copy

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // swap elements by index
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <p>Fetching data....</p>;
  }
  if (error) {
    return <p>{`Failed to fetch data ${error}`}</p>;
  }
  return (
    <main className={`outer-container`}>
      <div className={`inner-container`}>
        <Quiz quizData={quizData} shuffleArray={shuffleArray}/>
      </div>
    </main>
  );
}

export default App;
