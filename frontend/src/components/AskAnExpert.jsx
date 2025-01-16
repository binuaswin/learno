import { useState } from "react";
import PropTypes from "prop-types";

const AskAnExpert = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() !== "") {
      onSubmit(question);
      setQuestion(""); // Clear the input after submission
    }
  };

  return (
    <section className="ask-an-expert">
      <h2>Ask an Expert</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question here..."
        />
        <button type="submit">Submit Question</button>
      </form>
    </section>
  );
};

AskAnExpert.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AskAnExpert;
