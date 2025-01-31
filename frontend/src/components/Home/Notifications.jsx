import { Bell, CheckCircle, AlertCircle } from "lucide-react";

const notifications = [
  { message: "New learning module available!", type: "info" },
  { message: "Project deadline approaching!", type: "warning" },
  { message: "Skill milestone achieved! Great job!", type: "success" },
];

const Notifications = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center"><Bell className="mr-2" /> Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index} className={`flex items-center p-3 rounded-md mb-2 ${notif.type === "info" ? "bg-blue-100 text-blue-600" : notif.type === "warning" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-600"}`}>
            {notif.type === "info" && <Bell className="mr-3" />}
            {notif.type === "warning" && <AlertCircle className="mr-3" />}
            {notif.type === "success" && <CheckCircle className="mr-3" />}
            <p>{notif.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
