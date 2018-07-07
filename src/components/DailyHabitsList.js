import React from "react";
import PropTypes from "prop-types";
import HabitListItem from "./HabitListItem";

// const handleXClick = () => {
//   alert("clicked");
//   updateHabit();
// };

const DailyHabitsList = ({ habits, updateHabit }) => (
  <div>
    <h1>Check off the finished daily goals: </h1>
    <div className="habits-container">
      {habits.map((habit, index) => (
        <HabitListItem
          key={index}
          description={habit.description}
          completed={habit.completed}
          handleXClick={() => updateHabit(habit.id)}
        />
      ))}
    </div>
  </div>
);

DailyHabitsList.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  updateHabit: PropTypes.func.isRequired
};

export default DailyHabitsList;

// handleXClick = () => {
//   this.setState(prevState => ({
//     isClicked: !prevState.isClicked,
//     message: "Great job!"
//   }));
// };

// handleXClick={this.handleXClick}
