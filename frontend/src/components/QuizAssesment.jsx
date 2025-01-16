import { useState } from 'react';
import PropTypes from 'prop-types';
import './QuizAssesment.css';

const QuizAssessment = ({ questions }) => {
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswer;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    let feedbackArr = [];
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
        feedbackArr.push(`Question ${index + 1}: Correct`);
      } else {
        feedbackArr.push(`Question ${index + 1}: Incorrect. Correct answer: ${question.correctAnswer}`);
      }
    });
    setScore(score);
    setFeedback(feedbackArr);
  };

  const handleSubmit = () => {
    calculateScore();
  };

  return (
    <div className="quiz-assessment">
      <h2>Quiz & Assessments</h2>

      <div className="quiz-questions">
        {questions.map((question, index) => (
          <div key={index} className="quiz-question">
            <h3>{question.question}</h3>
            {question.options.map((option, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>Submit</button>

      {score !== null && (
        <div className="score-section">
          <p>Your Score: {score} / {questions.length}</p>
          <div className="feedback-section">
            {feedback.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

QuizAssessment.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default QuizAssessment;
