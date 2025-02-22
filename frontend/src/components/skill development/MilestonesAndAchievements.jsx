import { useState } from 'react';

// Sample data for milestones and achievements
const milestonesData = [
  {
    id: 1,
    title: 'Certified Python Programmer',
    description: 'Achieved mastery in Python programming',
    type: 'badge',
    date: '2025-02-18',
  },
  {
    id: 2,
    title: '5-day Streak of Practicing Python',
    description: 'Consistently practiced Python for 5 days in a row',
    type: 'streak',
    date: '2025-02-17',
  },
  {
    id: 3,
    title: 'JavaScript Beginner Mastery',
    description: 'Completed all beginner-level JavaScript exercises',
    type: 'badge',
    date: '2025-01-15',
  },
];

const MilestonesAndAchievements = () => {
  const [milestones, setMilestones] = useState(milestonesData);
  const [newMilestone, setNewMilestone] = useState({ title: '', description: '', type: '', date: '' });

  // Add new milestone
  const addMilestone = () => {
    const updatedMilestones = [...milestones, { ...newMilestone, id: milestones.length + 1 }];
    setMilestones(updatedMilestones);
    setNewMilestone({ title: '', description: '', type: '', date: '' });
  };

  return (
    <div style={{ margin: '40px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Milestones and Achievements</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>Milestone List</h3>
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <div
              key={milestone.id}
              style={{
                padding: '20px',
                marginBottom: '15px',
                backgroundColor: '#f4f6f9',
                borderRadius: '5px',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
              }}
            >
              <h4>{milestone.title}</h4>
              <p><strong>Description:</strong> {milestone.description}</p>
              <p><strong>Date:</strong> {milestone.date}</p>
              <p><strong>Type:</strong> {milestone.type === 'badge' ? 'Badge' : 'Streak'}</p>

              {milestone.type === 'badge' && (
                <img
                  src="https://via.placeholder.com/150/0000FF/808080?Text=Badge" 
                  alt="Badge"
                  style={{ width: '50px', marginTop: '10px' }}
                />
              )}

              {milestone.type === 'streak' && (
                <div style={{ marginTop: '10px', backgroundColor: '#ffc107', padding: '10px', borderRadius: '5px' }}>
                  <strong>Streak Achievement!</strong>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No milestones yet. Keep going!</p>
        )}
      </div>

      <div>
        <h3>Add New Milestone</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addMilestone();
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <label>Title:</label>
            <input
              type="text"
              value={newMilestone.title}
              onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
              required
              style={{ padding: '10px', marginLeft: '10px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Description:</label>
            <textarea
              value={newMilestone.description}
              onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
              required
              style={{ padding: '10px', marginLeft: '10px', width: '100%', height: '80px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Type:</label>
            <select
              value={newMilestone.type}
              onChange={(e) => setNewMilestone({ ...newMilestone, type: e.target.value })}
              required
              style={{ padding: '10px', marginLeft: '10px' }}
            >
              <option value="">Select Type</option>
              <option value="badge">Badge</option>
              <option value="streak">Streak</option>
            </select>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Date Achieved:</label>
            <input
              type="date"
              value={newMilestone.date}
              onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
              required
              style={{ padding: '10px', marginLeft: '10px' }}
            />
          </div>

          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Add Milestone
          </button>
        </form>
      </div>
    </div>
  );
};

export default MilestonesAndAchievements;
