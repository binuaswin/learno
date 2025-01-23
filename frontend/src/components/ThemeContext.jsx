import  { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Create a context to manage theme
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme preference in localStorage
  };

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme; // Add the current theme class to the body
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node
  };

  export default ThemeContext;
