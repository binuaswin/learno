//frontend/src/pages/ProgressDashboard.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import QuickStats from '../components/dashboard/QuickStats';
import PersonalizedRecommendations from '../components/dashboard/PersonalizedRecommendations';
import * as taskServices from '../services/taskServices';

const ProgressDashboard = ({ userId }) => {
  const [userProgress, setUserProgress] = useState({});
  const [modules, setModules] = useState([]);
  const [supplementaryContent, setSupplementaryContent] = useState([]);
  const [skillGapsRecommendations, setSkillGapsRecommendations] = useState({});

  useEffect(() => {
    taskServices.getUserProgress(userId).then(setUserProgress);
    taskServices.getModules().then(setModules);
    taskServices.getSupplementaryContent().then(setSupplementaryContent);
    taskServices.getSkillGapsRecommendations(userProgress.gaps).then(setSkillGapsRecommendations);
  }, [userId, userProgress.gaps]);

  return (
    <div className="progress-dashboard">
      <QuickStats userId={userId} />
      <PersonalizedRecommendations
        userProgress={userProgress}
        supplementaryContent={supplementaryContent}
        skillGapsRecommendations={skillGapsRecommendations}
        modules={modules}
      />
    </div>
  );
};

ProgressDashboard.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProgressDashboard;