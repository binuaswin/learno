import  { useState, useEffect } from 'react';
import './MotivationalElement.css';

const MotivationalElement = () => {
  const quotes = [
    "Believe in yourself and all that you are.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Dream it. Wish it. Do it.",
  ];

  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    // Set the initial quote
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Update the quote every 10 seconds
    const intervalId = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [quotes]);

  return (
    <section className="motivational-element">
      <h2>Motivational Quote</h2>
      <p className="quote">{currentQuote}</p>
    </section>
  );
};

export default MotivationalElement;
