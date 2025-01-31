import  { useState, useEffect } from 'react';

const ThemeToggle = () => {
  // Check for user's preference on initial load
  const [darkMode, setDarkMode] = useState(false);

  // Update the darkMode state based on user's preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Toggle dark mode and save preference to localStorage
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const theme = !darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-800 text-white rounded-full focus:outline-none"
    >
      {darkMode ? (
        <span className="text-xl">🌙</span> // Dark Mode Icon
      ) : (
        <span className="text-xl">☀️</span> // Light Mode Icon
      )}
    </button>
  );
};

export default ThemeToggle;
