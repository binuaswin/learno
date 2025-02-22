import { useState } from "react";
import { BarChart3, Book, CheckCircle, Lightbulb, PlayCircle } from "lucide-react";
import Header from "../components/Home/Header";
import Sidebar from "../components/Home/SideBar";

const AdaptiveLearning = () => {
  const [progress,] = useState(70); // Example progress value
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  // Sample Quiz Data
  const quizQuestions = [
    {
      question: "What does React use to optimize rendering?",
      options: ["Virtual DOM", "Real DOM", "Shadow DOM", "None of the above"],
      answer: "Virtual DOM",
    },
    {
      question: "Which hook is used to manage state in React?",
      options: ["useEffect", "useState", "useRef", "useReducer"],
      answer: "useState",
    },
  ];

  // Handle Quiz Option Selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Submit Quiz Answer
  const submitQuizAnswer = () => {
    if (selectedOption === quizQuestions[quizIndex].answer) {
      setQuizScore(quizScore + 1);
    }
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null);
    } else {
      alert(`Quiz Completed! Your Score: ${quizScore + 1}/${quizQuestions.length}`);
      setQuizStarted(false);
      setQuizIndex(0);
      setQuizScore(0);
    }
  };

  // Start Coding Exercise
  const submitExercise = () => {
    if (userAnswer.trim().toLowerCase() === "hello world") {
      alert("✅ Correct Answer! You've solved the exercise.");
    } else {
      alert("❌ Incorrect Answer! Try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Same as HomePage) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 p-6">
        {/* Header (Same as HomePage) */}
        <Header />

        <main className="container mx-auto p-4">
          {/* Page Title */}
          <div className="flex items-center gap-3 mb-6">
            <Book className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Adaptive Learning</h1>
          </div>

          {/* Learning Progress */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold">Your Learning Progress</h2>
            </div>
            <p className="text-gray-600 mt-2">You have completed {progress}% of your learning path.</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
           {/* Personalized Learning Recommendations */}
           <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-semibold">Next Recommended Steps</h2>
            </div>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>Complete Module 3: Advanced JavaScript</li>
              <li>Review Weak Areas: Algorithm Optimization</li>
              <li>Take a Quiz to Test Your Knowledge</li>
            </ul>
          </div>

          {/* Skill Mastery */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold">Skill Mastery Level</h2>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-gray-600">React.js: Intermediate</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Data Structures: Beginner</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Quiz */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <PlayCircle className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold">Interactive Quiz</h2>
            </div>

            {!quizStarted ? (
              <button
                onClick={() => setQuizStarted(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start Quiz
              </button>
            ) : (
              <div className="mt-4">
                <p className="text-gray-800 text-lg">{quizQuestions[quizIndex].question}</p>
                <div className="mt-3 space-y-2">
                  {quizQuestions[quizIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className={`w-full p-2 border rounded-lg ${
                        selectedOption === option ? "bg-blue-200" : "bg-gray-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button
                  onClick={submitQuizAnswer}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>

          {/* Coding Exercise */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold">Solve an Exercise</h2>
            </div>

            {!exerciseStarted ? (
              <button
                onClick={() => setExerciseStarted(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start Exercise
              </button>
            ) : (
              <div className="mt-4">
                <p className="text-gray-800 text-lg">
                  Write a function that returns the string `Hello World`.
                </p>
                <textarea
                  className="w-full p-3 border rounded-lg mt-3"
                  rows="3"
                  placeholder="Write your code here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
                <button
                  onClick={submitExercise}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>

          {/* Gamification & Achievements */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold">Achievements & Milestones</h2>
            </div>
            <p className="text-gray-600 mt-2">
              🎉 You’ve unlocked the **JavaScript Pro** badge! Keep up the great work!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdaptiveLearning;
