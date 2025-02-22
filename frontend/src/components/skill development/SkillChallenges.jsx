import  { useState } from 'react';

// Sample exercises data
const exercisesData = [
  {
    id: 1,
    skill: 'Programming (Python)',
    challenge: 'Complete Python Quiz: Loops and Functions',
    status: 'incomplete', // Can be 'incomplete', 'completed', or 'passed'
    difficulty: 'Intermediate',
  },
  {
    id: 2,
    skill: 'Communication',
    challenge: 'Speak for 2 minutes on the topic "Your Ideal Career"',
    status: 'incomplete',
    difficulty: 'Beginner',
  },
  {
    id: 3,
    skill: 'Design',
    challenge: 'Create a logo using Adobe Illustrator',
    status: 'completed',
    difficulty: 'Advanced',
  },
];

// Main component
const SkillChallenges = () => {
  const [exercises, setExercises] = useState(exercisesData);

  // Mark exercise as complete or passed
  const markAsComplete = (id) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.id === id
        ? { ...exercise, status: exercise.status === 'incomplete' ? 'completed' : 'passed' }
        : exercise
    );
    setExercises(updatedExercises);
  };

  // Adjust difficulty based on user proficiency (for simplicity, we simulate this here)
  const adjustDifficulty = (id) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === id) {
        if (exercise.difficulty === 'Beginner') {
          return { ...exercise, difficulty: 'Intermediate' };
        } else if (exercise.difficulty === 'Intermediate') {
          return { ...exercise, difficulty: 'Advanced' };
        }
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  return (
    <div style={{ margin: '40px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Skill Challenges and Exercises</h2>

      <div>
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            style={{
              padding: '20px',
              marginBottom: '15px',
              backgroundColor: '#f4f6f9',
              borderRadius: '5px',
              boxShadow: '0 0 5px rgba(0,0,0,0.1)',
            }}
          >
            <h4>{exercise.skill}</h4>
            <p><strong>Challenge:</strong> {exercise.challenge}</p>
            <p><strong>Status:</strong> {exercise.status}</p>
            <p><strong>Difficulty:</strong> {exercise.difficulty}</p>

            <div style={{ marginTop: '10px' }}>
              {/* Mark exercise as complete or passed */}
              {exercise.status === 'incomplete' && (
                <button
                  onClick={() => markAsComplete(exercise.id)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Mark as Completed
                </button>
              )}
              {exercise.status === 'completed' && (
                <button
                  onClick={() => markAsComplete(exercise.id)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }}
                >
                  Mark as Passed
                </button>
              )}

              {/* Adjust difficulty */}
              <button
                onClick={() => adjustDifficulty(exercise.id)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ffc107',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
              >
                Adjust Difficulty
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillChallenges;
