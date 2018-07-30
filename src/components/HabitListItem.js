import React from "react";

const HabitListItem = props => (
  <div
    className={
      "habit__single-div " + (props.completed ? "habit__complete" : "")
    }
  >
    <p className="p-habit-x">
      <span className="habit__name"> {props.name}: </span>
      {props.description} - Frequency: {props.frequency}
    </p>

    <button className="btn-primary btn-habit-x" onClick={props.handleXClick}>
      X
    </button>
  </div>
);

export default HabitListItem;
