import "./Notification.css";

const Notification = () => {
  return (
    <div>
      <ul>
        <li className="notification-item">New task available in Study Planner!</li>
        <li className="notification-item">Skill Development progress updated!</li>
        <li className="notification-item">Dont forget to review your learning modules!</li>
      </ul>
    </div>
  );
};

export default Notification;
