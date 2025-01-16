import  { useState } from "react";
import PropTypes from "prop-types";

const SaveForLater = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
    // Logic to save content to the user's profile or local storage can go here.
  };

  return (
    <button onClick={handleSave} className={`save-for-later ${saved ? "saved" : ""}`}>
      {saved ? "Saved" : "Save for Later"}
    </button>
  );
};

SaveForLater.propTypes = {
  contentId: PropTypes.string.isRequired,
};

export default SaveForLater;
