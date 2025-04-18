
import PropTypes from "prop-types";

const LearningProgressOverview = ({ user }) => {
  // Default data structure (adjust based on your API response)
  const modulesCompleted = user?.learning_progress?.length || 0;
  const skillLevels = user?.skills || [
    { name: "JavaScript", level: "Intermediate" },
    { name: "React", level: "Beginner" },
    { name: "Node.js", level: "Advanced" },
  ];
  const completedCourses = user?.completed_courses || [
    { title: "React Basics", date: "2025-03-15" },
    { title: "JavaScript Fundamentals", date: "2025-02-10" },
  ];
  const badges = user?.badges || [
    { name: "React Developer", date: "2025-03-20" },
    { name: "JavaScript Expert", date: "2025-02-15" },
  ];

  return (
    <div className="learning-progress-overview bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Learning Progress Overview</h3>

      {/* Learning Achievements */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Learning Achievements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{modulesCompleted}</p>
            <p className="text-sm text-gray-600">Modules Completed</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {skillLevels.filter((skill) => skill.level === "Advanced").length}
            </p>
            <p className="text-sm text-gray-600">Advanced Skills</p>
          </div>
        </div>
      </div>

      {/* Skill Progress */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Skill Progress</h4>
        <div className="space-y-2">
          {skillLevels.map((skill, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-md text-gray-800">{skill.name}: <span className="font-semibold">{skill.level}</span></p>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Courses/Modules */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Completed Courses</h4>
        {completedCourses.length > 0 ? (
          <ul className="space-y-2">
            {completedCourses.map((course, index) => (
              <li key={index} className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">{course.title}</span> -{" "}
                <span className="text-sm text-gray-600">{course.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No completed courses yet.</p>
        )}
      </div>

      {/* Badges/Certificates */}
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-2">Badges & Certificates</h4>
        {badges.length > 0 ? (
          <ul className="space-y-2">
            {badges.map((badge, index) => (
              <li key={index} className="p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium text-gray-800">{badge.name}</span> -{" "}
                <span className="text-sm text-gray-600">{badge.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No badges or certificates earned yet.</p>
        )}
      </div>
    </div>
  );
};

LearningProgressOverview.propTypes = {
  user: PropTypes.shape({
    learning_progress: PropTypes.array,
    skills: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
    })),
    completed_courses: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
    })),
    badges: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      date: PropTypes.string,
    })),
  }),
};

LearningProgressOverview.defaultProps = {
  user: {},
};

export default LearningProgressOverview;