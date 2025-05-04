// frontend/src/components/StudyPlanner/CustomizableSettings.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const CustomizableSettings = ({
  onViewChange = () => {},
  onThemeChange = () => {},
  onCategoryAdd = () => {},
  initialView = 'list',
  initialTheme = 'light',
  initialCategories = ['General'],
}) => {
  const [view, setView] = useState(initialView);
  const [theme, setTheme] = useState(initialTheme);
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState('');

  const handleViewChange = (e) => {
    const newView = e.target.value;
    setView(newView);
    onViewChange(newView);
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    onThemeChange(newTheme);
    document.documentElement.className = newTheme;
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory || categories.includes(newCategory)) return;
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    onCategoryAdd(newCategory);
    setNewCategory('');
  };

  return (
    <div className="customizable-settings">
      <h3>Settings</h3>

      <div className="settings-section">
        <h4>View Preferences</h4>
        <select value={view} onChange={handleViewChange} className="settings-select">
          <option value="list">List View</option>
          <option value="calendar">Calendar View</option>
        </select>
        <p>Current View: {view.charAt(0).toUpperCase() + view.slice(1)}</p>
      </div>

      <div className="settings-section">
        <h4>Theme Customization</h4>
        <select value={theme} onChange={handleThemeChange} className="settings-select">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="custom">Custom</option>
        </select>
        <p>Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</p>
      </div>

      <div className="settings-section">
        <h4>Task Categories</h4>
        <form onSubmit={handleAddCategory} className="category-form">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category (e.g., Exams)"
            className="category-input"
          />
          <button type="submit" className="add-category-button">
            Add Category
          </button>
        </form>
        <ul className="category-list">
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

CustomizableSettings.propTypes = {
  onViewChange: PropTypes.func,
  onThemeChange: PropTypes.func,
  onCategoryAdd: PropTypes.func,
  initialView: PropTypes.oneOf(['list', 'calendar']),
  initialTheme: PropTypes.oneOf(['light', 'dark', 'custom']),
  initialCategories: PropTypes.arrayOf(PropTypes.string),
};

CustomizableSettings.defaultProps = {
  initialView: 'list',
  initialTheme: 'light',
  initialCategories: ['General'],
};

export default CustomizableSettings;