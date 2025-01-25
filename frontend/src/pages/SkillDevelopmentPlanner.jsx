import "./SkillDevelopmentPlanner.css";
import SkillDevelopmentHeader from "../components/SkillDevelopmentHeader";
// import SkillListTracker from "../components/SkillListTracker";
import ProgressVisualization from "../components/ProgressVisualization";
//import AddNewSkill from "../components/AddNewSkill";
import SkillDevelopment from "../components/SkillDevelopment";


const SkillDevelopmentPlanner = () => {


  return (
    <div className="skill-planner-container">
      <SkillDevelopmentHeader />
      <SkillDevelopment />
      {/* <SkillListTracker /> */}
      <ProgressVisualization />
      

    
    </div>
  );
};

export default SkillDevelopmentPlanner;
