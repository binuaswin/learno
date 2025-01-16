import './AdaptiveLearningPage.css';
import AdaptiveLearningHeader from '../components/AdaptiveLearningHeader';
import CurrentLearningModule from '../components/CurrentLearningModule';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import LearningResources from '../components/LearningResources';
import AskAnExpert from '../components/AskAnExpert';
import PeerDiscussions from '../components/PeerDiscussions';
import SaveForLater from '../components/SaveForLater';
import QuizAssessment from '../components/QuizAssesment';

import PointsSystem from '../components/PointsSystem';
import Badges from '../components/Badges';
import Leaderboard from '../components/Leaderboard';
import FeedbackForm from '../components/FeedbackForm';
import CustomizationSettings from '../components/CustomizationSettings';

const AdaptiveLearningPage = () => {
    const sampleQuestions = [
        {
            question: "What is React?",
            options: ["A JavaScript library", "A CSS framework", "A database", "A programming language"],
            correctAnswer: "A JavaScript library",
        },
        {
            question: "What does JSX stand for?",
            options: ["JavaScript XML", "JavaScript Xtreme", "JavaScript Extended", "JavaScript Extension"],
            correctAnswer: "JavaScript XML",
        },
        // More questions...
    ];

    const sampleData = {
        videoTutorials: [
            { title: 'Introduction to React', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            { title: 'Advanced JavaScript', link: 'https://www.youtube.com/watch?v=9zU9yBZR_Ow' }
        ],
        downloadableContent: [
            { title: 'React Notes', link: '/path/to/react_notes.pdf' },
            { title: 'JavaScript Cheat Sheet', link: '/path/to/js_cheatsheet.pdf' }
        ],
        practiceProblems: [
            { title: 'React Quiz', link: 'https://www.example.com/quiz/react' },
            { title: 'JavaScript Challenges', link: 'https://www.example.com/quiz/javascript' }
        ],
        externalLinks: [
            { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
            { title: 'W3Schools', url: 'https://www.w3schools.com' }
        ]
    };

    const userName = "John Doe"; // Example username
    const progress = 45;

    const currentModule = {
        title: "React Basics",
        description: "Learn the fundamentals of React, including components, state, and props.",
        progress: 50,
        estimatedTime: "2 hours",
        resources: [
            { name: "React Documentation", link: "https://reactjs.org/docs/getting-started.html" },
            { name: "React Tutorial", link: "https://reactjs.org/tutorial/tutorial.html" },
        ],
    };

    const userProgress = {
        completedModules: ["HTML Basics", "CSS Fundamentals", "JavaScript Basics"],
        currentModule: "JavaScript Intermediate",
        skills: ["HTML", "CSS", "JavaScript"],
        gaps: ["Node.js", "React"]
    };

    const supplementaryContent = [
        { title: "JavaScript for Beginners - Video", link: "https://www.example.com/js-for-beginners" },
        { title: "Understanding Node.js - Article", link: "https://www.example.com/understanding-node" },
        { title: "React Basics - Tutorial", link: "https://www.example.com/react-tutorial" },
    ];

    const skillGapsRecommendations = {
        "Node.js": "Complete the Node.js Basics module.",
        "React": "Complete the React Basics module.",
    };

    const modules = [
        { name: "JavaScript Intermediate", isCompleted: true },
        { name: "Node.js Basics", isCompleted: false },
        { name: "React Basics", isCompleted: false },
        { name: "Advanced JavaScript", isCompleted: false },
    ];

    // Sample discussions for the PeerDiscussions component
    const sampleDiscussions = [
        {
            title: "React Hooks Overview",
            content: "Discuss the basics of React Hooks and how they simplify state management.",
            user: "Jane Doe",
        },
        {
            title: "JavaScript Closures",
            content: "Understanding closures in JavaScript with examples.",
            user: "John Smith",
        },
    ];
    const topLearners = [
        { name: "Alice", points: 1200 },
        { name: "Bob", points: 1100 },
        { name: "Charlie", points: 1050 },
      ];
    
      const badges = ["React Master", "JavaScript Pro", "HTML Expert"];
    
      const points = 350;
    
      const handleFeedbackSubmit = (feedback) => {
        console.log("Feedback submitted:", feedback);
      };
    
      const handleSettingsSave = (settings) => {
        console.log("Settings saved:", settings);
      };

    return (
        <div className="adaptive-learning-page">
            {/* Header/Overview Section */}
            <AdaptiveLearningHeader userName={userName} progress={progress} />

            {/* Current Learning Module Section */}
            <section className="current-learning-module-section">
                <h2>Current Learning Module</h2>
                <CurrentLearningModule module={currentModule} />
            </section>

            {/* Personalized Recommendations */}
            <PersonalizedRecommendations
                userProgress={userProgress}
                supplementaryContent={supplementaryContent}
                skillGapsRecommendations={skillGapsRecommendations}
                modules={modules}
            />

            {/* Learning Resources */}
            <LearningResources {...sampleData} />

            {/* Ask an Expert Section */}
            <AskAnExpert onSubmit={(question) => console.log("Question Submitted:", question)} />

            {/* Peer Discussions Section */}
            <PeerDiscussions discussions={sampleDiscussions} />

            {/* Save for Later Section */}
            <section className="save-for-later-section">
                <h2>Save for Later</h2>
                <SaveForLater contentId="module-1" />
                <SaveForLater contentId="module-2" />
            </section>

            {/* Quiz and Assessment Section */}
            <section className="quiz-assessment">
                <h2>Quick Quiz</h2>
                <QuizAssessment questions={sampleQuestions} />
            </section>

             {/* Gamification Section: Points, Badges, Leaderboard */}
      <section className="gamification-section">
        <PointsSystem points={points} />
        <Badges badges={badges} />
        <Leaderboard topLearners={topLearners} />
      </section>

      {/* Feedback Form Section */}
      <section className="feedback-form-section">
        <h2>Provide Feedback</h2>
        <FeedbackForm onSubmit={handleFeedbackSubmit} />
      </section>

      {/* Customization Settings Section */}
      <section className="customization-settings-section">
        <h2>Customize Your Experience</h2>
        <CustomizationSettings onSave={handleSettingsSave} />
      </section>

      {/* Visual Progress Tracker Section */}
      <section className="progress-tracker">
        <h2>Your Progress</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: '50%' }}>
            50% Completed
          </div>
        </div>
      </section>

            {/* Visual Progress Tracker */}
            <section className="progress-tracker">
                <h2>Your Progress</h2>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}>
                        {progress}% Completed
                    </div>
                </div>
            </section>

            {/* Motivational Element */}
            <section className="motivational-section">
                <h2>Keep Pushing Forward!</h2>
                <blockquote>
                    `Success is no accident. It is hard work, perseverance, learning, studying, sacrifice, and most of all, love of what you are doing or learning to do.`` - Pele
                </blockquote>
            </section>
        </div>
    );
};

export default AdaptiveLearningPage;
